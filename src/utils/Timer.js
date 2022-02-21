export default function sleep(timeout) {
    return new Promise(res => {
        setTimeout(res, timeout);
    });
}