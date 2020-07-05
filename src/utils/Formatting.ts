import padLeft from "pad-left";

export function FormatDuration(milliseconds:number):string {
    const hours = padLeft(((milliseconds / 3600000) | 0).toString(), 2, "0"); 
    const minutes = padLeft((((milliseconds % 3600000) / 60000) | 0).toString(), 2, "0");
    const seconds = padLeft((((milliseconds % 60000) / 1000) | 0).toString(), 2, "0");
    return `${hours}:${minutes}:${seconds}`;
}