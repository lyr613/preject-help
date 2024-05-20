// #region check result
export function init_check_result<Form extends Record<string, any> = {}>(ctrl: NOUItype.Form<Form>) {
    ctrl.check_res$.next(new Map())
    return ctrl
}

// #region value
export function init_value<Form extends Record<string, any> = {}>(ctrl: NOUItype.Form<Form>) {
    ctrl.value$.next(ctrl.mk_data())
    return ctrl
}

// #region rule
export function init_rule<Form extends Record<string, any> = {}>(ctrl: NOUItype.Form<Form>) {
    ctrl.rules.clear
    return ctrl
}

// #region require
export function init_requires<Form extends Record<string, any> = {}>(ctrl: NOUItype.Form<Form>) {
    ctrl.requires$.next(new Map())
    return ctrl
}

// #region disable
export function init_disables<Form extends Record<string, any> = {}>(ctrl: NOUItype.Form<Form>) {
    ctrl.disables$.next(new Map())
    return ctrl
}

// #region filter
export function init_filters<Form extends Record<string, any> = {}>(ctrl: NOUItype.Form<Form>) {
    ctrl.filters.clear()
    return ctrl
}

// #region all
export function init_all<Form extends Record<string, any> = {}>(ctrl: NOUItype.Form<Form>) {
    init_check_result(ctrl)
    init_value(ctrl)
    init_rule(ctrl)
    init_requires(ctrl)
    init_disables(ctrl)
    init_filters(ctrl)
    return ctrl
}

// #region form
/**
 * - init form value
 * - init check result
 * @param ctrl
 */
export function init_form<Form extends Record<string, any> = {}>(ctrl: NOUItype.Form<Form>) {
    init_check_result(ctrl)
    init_value(ctrl)
    return ctrl
}

// #region option
export function init_option<Form extends Record<string, any> = {}>(p: {
    ctrl: NOUItype.Form<Form>
    /** default false */
    value?: boolean
    /** default false */
    check_result?: boolean
    /** default false */
    rule?: boolean
    /** default false */
    requires?: boolean
    /** default false */
    disables?: boolean
    /** default false */
    formats?: boolean
}) {
    const { ctrl, value, check_result, rule, requires, disables, formats } = p
    if (value) {
        init_value(ctrl)
    }
    if (check_result) {
        init_check_result(ctrl)
    }
    if (rule) {
        init_rule(ctrl)
    }
    if (requires) {
        init_requires(ctrl)
    }
    if (disables) {
        init_disables(ctrl)
    }
    if (formats) {
        init_filters(ctrl)
    }
    return ctrl
}
