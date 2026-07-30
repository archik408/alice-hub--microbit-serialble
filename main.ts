function handleCommand (cmd: string) {
    // Короткий тон в фоне: длинная мелодия / UntilDone рвёт BLE-стек на v2
    if (cmd == "SMILE") {
        basic.showIcon(IconNames.Happy)
    } else if (cmd == "SAD") {
        basic.showIcon(IconNames.Sad)
    } else if (cmd == "CLEAR") {
        basic.clearScreen()
    } else if (cmd == "HEART") {
        basic.showIcon(IconNames.Heart)
    } else if (cmd == "YES" || cmd == "LOGO") {
        basic.showIcon(IconNames.Yes)
    } else if (cmd == "NO") {
        basic.showIcon(IconNames.No)
    } else if (cmd == "BEEP") {
        music.play(music.tonePlayable(262, 100), music.PlaybackMode.InBackground)
    }
}
// USB (Web Serial) — то, что уже работает у вас
serial.onDataReceived(serial.delimiters(Delimiters.NewLine), function () {
    handleCommand(serial.readUntil(serial.delimiters(Delimiters.NewLine)))
})
// Web Bluetooth UART — без этого блока BLE-команды не доходят
bluetooth.onUartDataReceived(serial.delimiters(Delimiters.NewLine), function () {
    handleCommand(bluetooth.uartReadUntil(serial.delimiters(Delimiters.NewLine)))
})
bluetooth.startUartService()
