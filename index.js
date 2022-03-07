//const { core } = require('./lib')
const { default: makeWASocket, useSingleFileAuthState, DisconnectReason, fetchLatestBaileysVersion } = require("@adiwajshing/baileys")
const { state, saveState } = useSingleFileAuthState('./wabasemdConnection.json')

const startSock = async () => {
    // fetch latest version of WA Web
    const { version, isLatest } = await fetchLatestBaileysVersion()
    console.log(`using WA v${version.join('.')}, isLatest: ${isLatest}`)

    const sock = makeWASocket({ version, printQRInTerminal: true, auth: state })

    //Mensaje de bienvenida al BOT
    //sock.ev.on('messages.upsert', async m => await core(sock, m))

    sock.ev.on('connection.update', (update) => {
        const { connection, lastDisconnect } = update
        if (connection === 'close') lastDisconnect.error?.output?.statusCode !== DisconnectReason.loggedOut
            ? startSock() : console.log('+ connection closed')
    })

    sock.ev.on('creds.update', saveState)

    sock.ev.on('messages.upsert', async (context) => {
        console.log('message :', context.messages[0].message)
    })
}

startSock()