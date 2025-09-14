export function allowOnlyNumbers(event: KeyboardEvent) {
    const char = String.fromCharCode(event.keyCode || event.which);
    if (!/[0-9]/.test(char)) {
        event.preventDefault();
    }
}