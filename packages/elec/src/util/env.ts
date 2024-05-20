type mode = 'preview' | 'build'

export const mode = process.env.NODE_ENV === 'development' ? 'preview' : 'build'

function get_mode(raw: string): mode {
    switch (raw) {
        case 'build':
            return 'build'

        default:
            return 'preview'
    }
}

export const is_preview = mode === 'preview'
