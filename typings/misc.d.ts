// We need to tell TypeScript that when we write "import styles from './styles.css' we mean to load a module (to look for a './styles.css.d.ts').
declare module "*.css" {
  const content: { [className: string]: string }
  export default content
}

declare module "*.svg" {
  const content: string
  export default content
}
