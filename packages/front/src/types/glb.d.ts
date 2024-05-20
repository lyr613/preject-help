import { Subject } from 'rxjs'

declare global {
    interface Window {
        __server: {
            preset_push(): Function
            push(data: any): void
        }
    }
}
