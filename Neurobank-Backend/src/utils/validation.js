class ValidationError extends Error {
    constructor(message) {
        super(message)
        this.name = 'ValidationError'
    }
}

const validateNote = (noteData) => {
    const { title, content, userId } = noteData

    if (!title || typeof title !== 'string' || title.trim().length === 0) {
        throw new ValidationError('Titel krävs och måste vara en icke-tom sträng')
    }

    if (!content || typeof content !== 'string' || content.trim().length === 0) {
        throw new ValidationError('Innehåll krävs och måste vara en icke-tom sträng')
    }

    if (!userId || typeof userId !== 'string') {
        throw new ValidationError('Användar-ID krävs')
    }

    if (title.length > 200) {
        throw new ValidationError('Titel får inte vara längre än 200 tecken')
    }

    if (content.length > 10000) {
        throw new ValidationError('Innehåll får inte vara längre än 10000 tecken')
    }
}

const validateUser = (userData) => {
    const { email, name } = userData

    if (!email || typeof email !== 'string' || !email.includes('@')) {
        throw new ValidationError('Giltig e-postadress krävs')
    }

    if (!name || typeof name !== 'string' || name.trim().length === 0) {
        throw new ValidationError('Namn krävs och måste vara en icke-tom sträng')
    }

    if (name.length > 100) {
        throw new ValidationError('Namn får inte vara längre än 100 tecken')
    }
}

const validateProcessType = (processType) => {
    const validTypes = ['summarize', 'expand', 'analyze', 'structure']

    if (!processType || !validTypes.includes(processType)) {
        throw new ValidationError(`ProcessType måste vara en av: ${validTypes.join(', ')}`)
    }
}

const validateRequired = (fields) => {
    const missingFields = []

    for (const [fieldName, value] of Object.entries(fields)) {
        if (!value || (typeof value === 'string' && value.trim().length === 0)) {
            missingFields.push(fieldName)
        }
    }

    if (missingFields.length > 0) {
        return {
            isValid: false,
            message: `Required fields missing: ${missingFields.join(', ')}`
        }
    }

    return {
        isValid: true,
        message: null
    }
}

module.exports = {
    ValidationError,
    validateNote,
    validateUser,
    validateProcessType,
    validateRequired
}
