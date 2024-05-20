import { v4 } from 'uuid'

export function make() {
    return v4().replace(/-/g, '')
}
