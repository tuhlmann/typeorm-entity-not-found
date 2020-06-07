import { SetMetadata } from "@nestjs/common"

export const CLASS_TO_DTO_INTERCEPTOR_OPTIONS = "class_to_dto_interceptor:options"

export interface ClassToDtoInterceptorOptionsType {
  [optionName: string]: any
}

export const ClassToDtoInterceptorOptions = (options: ClassToDtoInterceptorOptionsType) =>
  SetMetadata(CLASS_TO_DTO_INTERCEPTOR_OPTIONS, options)
