const { default: makeWASocket, useSingleFileAuthState, DisconnectReason, fetchLatestBaileysVersion } = require("@adiwajshing/baileys")
const { state, saveState } = useSingleFileAuthState('./wabasemdConnection.json')

const startsOlympus = async () => {
    // fetch latest version of WA Web
    const { version, isLatest } = await fetchLatestBaileysVersion()
    console.log(`using WA v${version.join('.')}, isLatest: ${isLatest}`)

    const sock = makeWASocket({ version, printQRInTerminal: true, auth: state })
    sock.ev.on('messages.upsert', async m => await core(sock, m))
    sock.ev.on('connection.update', (update) => {
        const { connection, lastDisconnect } = update
        if (connection === 'close') lastDisconnect.error?.output?.statusCode !== DisconnectReason.loggedOut
            ? startsOlympus() : console.log('+ connection closed')
    })
    sock.ev.on('creds.update', saveState)
}

startsOlympus()