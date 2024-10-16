tailwind.config = {
    theme: {
        extend: {
            colors: {
                blurple: '#5865F2',
                darkBlurple: '#4752C4',
                discordDark: '#36393f',
                discordDarker: '#2f3136',
                discordDarkest: '#202225',
            },
        },
    },
}

const sections = {
    setup: `
        <h2 class="text-2xl font-bold mb-4">Setting Up Your Development Environment</h2>
        <ol class="list-decimal list-inside space-y-2">
            <li>Install Node.js and npm from <a href="https://nodejs.org" class="text-blurple hover:underline">nodejs.org</a></li>
            <li>Choose and install a code editor or IDE:
                <ul class="list-disc list-inside ml-6 mt-2">
                    <li><a href="https://code.visualstudio.com/" class="text-blurple hover:underline">Visual Studio Code</a> (recommended for beginners)</li>
                    <li><a href="https://www.sublimetext.com/" class="text-blurple hover:underline">Sublime Text</a></li>
                    <li><a href="https://www.jetbrains.com/webstorm/" class="text-blurple hover:underline">WebStorm</a> (paid, but powerful)</li>
                </ul>
            </li>
            <li>Create a new project directory</li>
            <li>Open a terminal in your project directory</li>
            <li>Initialize a new npm project: <code class="bg-discordDarkest px-2 py-1 rounded">npm init -y</code></li>
            <li>Install discord.js: <code class="bg-discordDarkest px-2 py-1 rounded">npm install discord.js</code></li>
            <li>Create a new file named <code class="bg-discordDarkest px-2 py-1 rounded">bot.js</code></li>
        </ol>
    `,
    'basic-bot': `
        <h2 class="text-2xl font-bold mb-4">Basic Bot Setup</h2>
        <p class="mb-4">Here's the basic structure for your Discord bot:</p>
        <pre class="code-block"><code class="language-javascript">
const { Client, GatewayIntentBits } = require('discord.js');
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ]
});

client.on('ready', () => {
  console.log(\`Logged in as \${client.user.tag}!\`);
  client.user.setActivity('with Discord.js', { type: 'PLAYING' });
});

client.on('messageCreate', (message) => {
  if (message.content === 'ping') {
    message.reply('Pong!');
  }
});

client.login('YOUR_BOT_TOKEN');
        </code></pre>
        <p class="mt-4">Replace 'YOUR_BOT_TOKEN' with your actual bot token from the Discord Developer Portal.</p>
    `,
    arguments: `
        <h2 class="text-2xl font-bold mb-4">Understanding Arguments</h2>
        <p>Arguments are the words or phrases that come after a command. Here's how to handle them:</p>
        <pre class="code-block"><code class="language-javascript">
client.on('messageCreate', (message) => {
  if (!message.content.startsWith('!')) return;

  const args = message.content.slice(1).trim().split(/ +/);
  const command = args.shift().toLowerCase();

  // Now you can use 'command' and 'args' in your bot logic
});
        </code></pre>
    `,
    permissions: `
        <h2 class="text-2xl font-bold mb-4">Understanding Permissions</h2>
        <p>Discord uses a permission system to control what actions users and bots can perform. Here's how to check for permissions:</p>
        <pre class="code-block"><code class="language-javascript">
if (message.member.permissions.has('ADMINISTRATOR')) {
  // User has admin permissions
}

if (message.member.permissions.has('BAN_MEMBERS')) {
  // User can ban members
}
        </code></pre>
    `,
    commands: `
        <h2 class="text-2xl font-bold mb-4">Example Commands</h2>
        <h3 class="text-xl font-semibold mb-2">Echo Command</h3>
        <pre class="code-block"><code class="language-javascript">
if (command === 'echo') {
  if (!args.length) {
    return message.reply('You need to provide some text to echo!');
  }
  message.channel.send(args.join(' '));
}
        </code></pre>
        <h3 class="text-xl font-semibold mb-2 mt-4">Ban Command</h3>
        <pre class="code-block"><code class="language-javascript">
if (command === 'ban') {
  if (!message.member.permissions.has('BAN_MEMBERS')) {
    return message.reply("You don't have permission to use this command.");
  }

  const user = message.mentions.users.first();
  if (!user) {
    return message.reply("You need to mention a user to ban!");
  }

  const reason = args.slice(1).join(' ') || 'No reason provided';

  message.guild.members.ban(user, { reason: reason })
    .then(() => {
      message.reply(\`Successfully banned \${user.tag} for reason: \${reason}\`);
    })
    .catch(error => {
      message.reply(\`Failed to ban \${user.tag}: \${error}\`);
    });
}
        </code></pre>
    `,
    'handling-commands': `
        <h2 class="text-2xl font-bold mb-4">Handling Commands</h2>
        <p class="mb-4">As your bot grows, you'll want more efficient ways to handle commands. Here are two approaches:</p>
        
        <h3 class="text-xl font-semibold mb-2">Using Switch Cases</h3>
        <p class="mb-2">For bots with a moderate number of commands (around 5-10), using a switch statement can be more readable than multiple if-else statements:</p>
        <pre class="code-block"><code class="language-javascript">
client.on('messageCreate', (message) => {
  if (!message.content.startsWith('!')) return;

  const args = message.content.slice(1).trim().split(/ +/);
  const command = args.shift().toLowerCase();

  switch(command) {
    case 'ping':
      message.reply('Pong!');
      break;
    case 'echo':
      if (args.length) message.channel.send(args.join(' '));
      break;
    case 'ban':
      // Ban logic here
      break;
    // Add more cases as needed
    default:
      message.reply('Unknown command');
  }
});
        </code></pre>

        <h3 class="text-xl font-semibold mb-2 mt-4">Using a Command Handler</h3>
        <p class="mb-2">For bots with 10+ commands, it's better to use a command handler. This involves creating separate files for each command and dynamically loading them. Here's a basic example:</p>
        <pre class="code-block"><code class="language-javascript">
// bot.js
const fs = require('fs');
const { Client, Collection, GatewayIntentBits } = require('discord.js');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ]
});

client.commands = new Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
  const command = require(\`./commands/\${file}\`);
  client.commands.set(command.name, command);
}

client.on('messageCreate', (message) => {
  if (!message.content.startsWith('!') || message.author.bot) return;

  const args = message.content.slice(1).trim().split(/ +/);
  const commandName = args.shift().toLowerCase();

  if (!client.commands.has(commandName)) return;

  try {
    client.commands.get(commandName).execute(message, args);
  } catch (error) {
    console.error(error);
    message.reply('There was an error executing that command!');
  }
});

client.login('YOUR_BOT_TOKEN');
        </code></pre>

        <p class="mt-2">Then, create a 'commands' folder and add individual command files:</p>
        <pre class="code-block"><code class="language-javascript">
// commands/ping.js
module.exports = {
  name: 'ping',
  description: 'Ping!',
  execute(message, args) {
    message.channel.send('Pong!');
  },
};

// commands/echo.js
module.exports = {
  name: 'echo',
  description: 'Echoes a message',
  execute(message, args) {
    if (args.length) message.channel.send(args.join(' '));
  },
};
        </code></pre>
        <p class="mt-2">This approach makes your code more modular and easier to maintain as your bot grows.</p>
    `,
    'full-bot': `
        <h2 class="text-2xl font-bold mb-4">Putting It All Together: Full Bot</h2>
        <p>Here's a basic bot that incorporates all the concepts we've covered:</p>
        <pre class="code-block"><code class="language-javascript">
const { Client, GatewayIntentBits } = require('discord.js');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ]
});

client.on('ready', () => {
  console.log(\`Logged in as \${client.user.tag}!\`);
  client.user.setActivity('with Discord.js', { type: 'PLAYING' });
});

client.on('messageCreate', (message) => {
  if (!message.content.startsWith('!')) return;

  const args = message.content.slice(1).trim().split(/ +/);
  const command = args.shift().toLowerCase();

  switch(command) {
    case 'ping':
      message.reply('Pong!');
      break;
    case 'echo':
      if (!args.length) {
        return message.reply('You need to provide some text to echo!');
      }
      message.channel.send(args.join(' '));
      break;
    case 'ban':
      if (!message.member.permissions.has('BAN_MEMBERS')) {
        return message.reply("You don't have permission to use this command.");
      }
      const user = message.mentions.users.first();
      if (!user) {
        return message.reply("You need to mention a user to ban!");
      }
      const reason = args.slice(1).join(' ') || 'No reason provided';
      message.guild.members.ban(user, { reason: reason })
        .then(() => {
          message.reply(\`Successfully banned \${user.tag} for reason: \${reason}\`);
        })
        .catch(error => {
          message.reply(\`Failed to ban \${user.tag}: \${error}\`);
        });
      break;
    default:
      message.reply('Unknown command. Try !ping, !echo, or !ban.');
  }
});

client.login('YOUR_BOT_TOKEN');
        </code></pre>
        <p class="mt-4">This bot includes a ping command, an echo command that uses arguments, and a ban command that checks for permissions.</p>
    `
};

function createButtons() {
    const navButtons = document.getElementById('flex flex-wrap gap-2');
    for (const sectionKey in sections) {
        const button = document.createElement('button');
        button.textContent = sectionKey.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
        button.classList.add('nav-button');
        button.onclick = () => showSection(sectionKey);
        navButtons.appendChild(button);
    }
}

// Call this function when the page loads
document.addEventListener('DOMContentLoaded', createButtons);

function showSection(sectionName) {
    const overlay = document.getElementById('overlay');
    const cardContent = document.getElementById('cardContent');
    cardContent.innerHTML = sections[sectionName];
    overlay.classList.remove('hidden');
    Prism.highlightAll();
    // Update URL
    history.pushState(null, '', `${window.location.pathname}#${sectionName}`);
}

function closeCard() {
    const overlay = document.getElementById('overlay');
    overlay.classList.add('hidden');
    // Remove hash from URL
    history.pushState(null, '', window.location.pathname);
}

// Close the card when clicking outside of it
document.getElementById('overlay').addEventListener('click', function(event) {
    if (event.target === this) {
        closeCard();
    }
});

// Check for hash in URL on page load
window.addEventListener('load', function() {
    const hash = window.location.hash.substring(1);
    if (hash && sections[hash]) {
        showSection(hash);
    }
});

// Highlight code blocks
Prism.highlightAll();
