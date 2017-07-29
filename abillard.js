const Discord = require('discord.js')
const client = new Discord.Client()
const ms = require('ms')
const Duration = '604800s' //Tu peux ici indiqué d pour jours, h pour heures, m minute, s second...   !!!! MAX 24jours
const channelName = 'partage_pub'
let userLocked = []
console.log(ms(Duration))
client.on('ready', () => {
  console.log('ready')
})

client.on('message', async (message) => {
  if (message.author.bot) return
  if (message.channel.type !== 'text') return
  if (message.channel.name !== channelName) return
if (!message.guild.member(client.user).hasPermission('MANAGE_CHANNELS')) return console.log('Le bot ne peux pas modifié le canal')
  try {
    await message.channel.overwritePermissions(message.author, {
      SEND_MESSAGES: false
    })
    userLocked[message.author.id] = setTimeout(async () => {
      await message.channel.overwritePermissions(message.author, {
        SEND_MESSAGES: null
      })
      delete userLocked[message.author.id]
    }, ms(Duration))

  } catch (err) {
    console.error(err)
  }

})

process.on('unhandledRejection', err => {
  console.error('Uncaught Promise Error: \n' + err.stack)
})

client.login('MjgxODc3MzQ2NDIyODgyMzA0.DF5Mow.m50T01AfxwnoQBPgnS2qO9UDAAQ').catch(console.error)
