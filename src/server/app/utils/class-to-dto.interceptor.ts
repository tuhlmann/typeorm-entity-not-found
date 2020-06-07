import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common"
import { Reflector } from "@nestjs/core"
import { plainToClass } from "class-transformer"
import { Observable } from "rxjs"
import { map } from "rxjs/operators"
import {
  ClassToDtoInterceptorOptionsType,
  CLASS_TO_DTO_INTERCEPTOR_OPTIONS,
} from "./class-to-dto.decorator"

interface ClassType<T> {
  new (): T
}

interface ClassToDtoInterceptorOptions {
  excludeExtraneousValues?: boolean
}

/**
 * Use this in a controller route to create a dto from the return type.
 * Add @Expose() to the Dto fields you want included, the rest will be removed by default.
 * If you do not want to remove any props, add { excludeExtraneousValues: false} to the options for this intercepted route.
 */
@Injectable()
export class ClassToDtoInterceptor<T> implements NestInterceptor<Partial<T>, T> {
  reflector: Reflector
  constructor(
    private readonly classType: ClassType<T>,
    private readonly options?: ClassToDtoInterceptorOptions,
  ) {
    this.reflector = new Reflector()
  }

  intercept(context: ExecutionContext, next: CallHandler<Partial<T>>): Observable<T> {
    const options = this.reflector.get<ClassToDtoInterceptorOptionsType>(
      CLASS_TO_DTO_INTERCEPTOR_OPTIONS,
      context.getHandler(),
    )
    const mergedOptions = {
      excludeExtraneousValues: true,
      ...options,
      ...this.options,
    }
    return next.handle().pipe(map(data => plainToClass(this.classType, data, mergedOptions)))
  }
}
