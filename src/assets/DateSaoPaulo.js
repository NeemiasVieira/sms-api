export class MyDate extends Date {
    constructor() {
        super();
        this.adjustTimezone();
    }

    adjustTimezone() {
        const offset = this.getTimezoneOffset();
        const offsetMilliseconds = offset * 60 * 1000; // Converte minutos em milissegundos
        this.setTime(this.getTime() - offsetMilliseconds);
    }
}