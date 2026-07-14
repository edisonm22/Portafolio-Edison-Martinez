import { forwardRef, InputHTMLAttributes, TextareaHTMLAttributes, SelectHTMLAttributes } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  hint?: string
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, hint, leftIcon, rightIcon, className = '', id, ...props }, ref) => {
    const inputId = id || props.name
    const errorId = `${inputId}-error`
    const hintId = `${inputId}-hint`

    return (
      <div className="w-full">
        {label && (
          <label htmlFor={inputId} className="block text-sm font-medium text-text-primary mb-2">
            {label}
          </label>
        )}
        <div className="relative">
          {leftIcon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none">
              {leftIcon}
            </div>
          )}
          <input
            ref={ref}
            id={inputId}
            className={`
              w-full px-4 py-3 rounded-xl border bg-dark-surface text-text-primary
              placeholder:text-text-muted transition-all duration-200
              focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20
              disabled:bg-dark-border/50 disabled:cursor-not-allowed
              ${leftIcon ? 'pl-10' : ''} ${rightIcon ? 'pr-10' : ''}
              ${className}
              ${error ? 'border-red-500/50 focus:border-red-500 focus:ring-red-500/20' : 'border-dark-border hover:border-primary/50'}
            `}
            aria-invalid={error ? 'true' : 'false'}
            aria-describedby={`${error ? errorId : ''} ${hint ? hintId : ''}`.trim() || undefined}
            {...props}
          />
          {rightIcon && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none">
              {rightIcon}
            </div>
          )}
        </div>
        {error && (
          <p id={errorId} className="mt-2 text-sm text-red-400 flex items-center gap-1" role="alert">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>
            {error}
          </p>
        )}
        {hint && !error && <p id={hintId} className="mt-2 text-sm text-text-muted">{hint}</p>}
      </div>
    )
  }
)

Input.displayName = 'Input'

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  error?: string
  hint?: string
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, hint, className = '', id, ...props }, ref) => {
    const textareaId = id || props.name
    const errorId = `${textareaId}-error`
    const hintId = `${textareaId}-hint`

    return (
      <div className="w-full">
        {label && (
          <label htmlFor={textareaId} className="block text-sm font-medium text-text-primary mb-2">
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          id={textareaId}
          className={`
            w-full px-4 py-3 rounded-xl border bg-dark-surface text-text-primary
            placeholder:text-text-muted transition-all duration-200 resize-y
            focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20
            disabled:bg-dark-border/50 disabled:cursor-not-allowed
            ${className}
            ${error ? 'border-red-500/50 focus:border-red-500 focus:ring-red-500/20' : 'border-dark-border hover:border-primary/50'}
          `}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={`${error ? errorId : ''} ${hint ? hintId : ''}`.trim() || undefined}
          {...props}
        />
        {error && (
          <p id={errorId} className="mt-2 text-sm text-red-400 flex items-center gap-1" role="alert">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>
            {error}
          </p>
        )}
        {hint && !error && <p id={hintId} className="mt-2 text-sm text-text-muted">{hint}</p>}
      </div>
    )
  }
)

Textarea.displayName = 'Textarea'

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string
  error?: string
  hint?: string
  options: { value: string; label: string }[]
  placeholder?: string
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, error, hint, options, placeholder, className = '', id, ...props }, ref) => {
    const selectId = id || props.name
    const errorId = `${selectId}-error`
    const hintId = `${selectId}-hint`

    return (
      <div className="w-full">
        {label && (
          <label htmlFor={selectId} className="block text-sm font-medium text-text-primary mb-2">
            {label}
          </label>
        )}
        <div className="relative">
          <select
            ref={ref}
            id={selectId}
            className={`
              w-full px-4 py-3 pr-10 rounded-xl border bg-dark-surface text-text-primary
              appearance-none transition-all duration-200
              focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20
              disabled:bg-dark-border/50 disabled:cursor-not-allowed
              ${className}
              ${error ? 'border-red-500/50 focus:border-red-500 focus:ring-red-500/20' : 'border-dark-border hover:border-primary/50'}
            `}
            aria-invalid={error ? 'true' : 'false'}
            aria-describedby={`${error ? errorId : ''} ${hint ? hintId : ''}`.trim() || undefined}
            {...props}
          >
            {placeholder && <option value="" disabled>{placeholder}</option>}
            {options.map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
          <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-text-muted">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7"/></svg>
          </div>
        </div>
        {error && <p id={errorId} className="mt-2 text-sm text-red-400 flex items-center gap-1" role="alert"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>{error}</p>}
        {hint && !error && <p id={hintId} className="mt-2 text-sm text-text-muted">{hint}</p>}
      </div>
    )
  }
)

Select.displayName = 'Select'

interface LabelProps {
  required?: boolean
  children: React.ReactNode
  className?: string
  htmlFor?: string
}

export const Label = forwardRef<HTMLLabelElement, LabelProps>(
  ({ required, children, className = '', htmlFor, ...props }, ref) => (
    <label ref={ref} htmlFor={htmlFor} className={`block text-sm font-medium text-text-primary mb-2 ${className}`} {...props}>
      {children}
      {required && <span className="text-red-400 ml-1" aria-hidden="true">*</span>}
    </label>
  )
)

Label.displayName = 'Label'