import './style.css'

type Email = {
  from: string
  header: string
  content: string
  emailAddress: string
  img: string
  read: boolean
}

type State = {
  emails: Email[]
  selectedEmail: Email | null
  filter: string
}

const state: State = {
  emails: [
    {
      from: 'Nico',
      header: "Link to today's video and slides is up!",
      content:
        'Link is up and you know where to find it! Lorem ipsum dolor sit amet consectetur, adipisicing elit. Adipisci quo et assumenda voluptas blanditiis incidunt quia in, accusamus, qui voluptatem porro. Est reiciendis cum a architecto earum voluptatibus vel atque.',
      emailAddress: 'nico@email.com',
      img: 'assets/nico.JPG',
      read: true
    },
    {
      from: 'Ed',
      header:
        "Congratulations! You have received a free beaver! Your name will now be displayed in the classroom's beaver list!",
      content:
        'Beaver beaver beaver beaver beaver beaver beaver beaver ! Lorem ipsum dolor sit amet consectetur, adipisicing elit. Adipisci quo et assumenda voluptas blanditiis incidunt quia in, accusamus, qui voluptatem porro. Est reiciendis cum a architecto earum voluptatibus vel atque.',
      emailAddress: 'ed@email.com',
      img: 'assets/ed.JPG',
      read: false
    },
    {
      from: 'Government',
      header: 'Time to pay your tax!',
      content:
        'Pay us now! Pay us now! Lorem ipsum dolor sit amet consectetur, adipisicing elit. Adipisci quo et assumenda voluptas blanditiis incidunt quia in, accusamus, qui voluptatem porro. Est reiciendis cum a architecto earum voluptatibus vel atque.',
      emailAddress: 'government@email.com',
      img: 'assets/gov.jpg',
      read: false
    },
    {
      from: 'Government',
      header: 'You know what happens next...',
      content: 'MOOOOO! Mwahahahaha.',
      emailAddress: 'government@email.com',
      img: 'assets/gov.jpg',
      read: false
    }
  ],
  selectedEmail: null,
  filter: ''
}

function selectEmail (email: Email) {
  email.read = true
  state.selectedEmail = email
}

function deselectEmail () {
  state.selectedEmail = null
}


function getFilteredEmails () {
  return state.emails.filter(
    email =>
      email.content.toLowerCase().includes(state.filter.toLowerCase()) ||
      email.from.toLowerCase().includes(state.filter.toLowerCase())
  )
}


function renderEmailListItem (email: Email, listEl: HTMLUListElement) {
  let liEl = document.createElement('li')
  liEl.className = email.read ? 'emails-list__item read' : 'emails-list__item'
  liEl.addEventListener('click', function () {
    selectEmail(email)
    render()
  })


  let readIconEl = document.createElement('span')
  readIconEl.className =
    'emails-list__item__read-icon material-symbols-outlined'
  readIconEl.textContent = email.read ? 'mark_email_read' : 'mark_email_unread'

  let imgEl = document.createElement('img')
  imgEl.className = 'emails-list__item__image'
  imgEl.src = email.img

  let fromEl = document.createElement('p')
  fromEl.classList.add('emails-list__item__from')
  fromEl.textContent = email.from

  let contentEl = document.createElement('p')
  contentEl.className = 'emails-list__item__content'
  contentEl.textContent = email.header
  liEl.append(readIconEl, imgEl, fromEl, contentEl)

  listEl.appendChild(liEl)
}

function renderEmailList () {
  let mainEl = document.querySelector('main')
  if (mainEl === null) return
  mainEl.textContent = ''

  let titleEl = document.createElement('h1')
  titleEl.textContent = 'Inbox'

  let listEl = document.createElement('ul')
  listEl.className = 'emails-list'

  for (let email of state.emails) {
    renderEmailListItem(email, listEl)
  }
  mainEl.append(titleEl, listEl)
}

function renderEmailDetails () {
  let mainEl = document.querySelector('main')
  if (mainEl === null) return
  if (state.selectedEmail === null) return

  mainEl.textContent = ''

  let backButton = document.createElement('button')
  backButton.textContent = 'BACK'
  backButton.addEventListener('click', function () {
    deselectEmail()
    render()
  })

  let titleEl = document.createElement('h1')
  titleEl.textContent = state.selectedEmail.from

  let imgEl = document.createElement('img')
  imgEl.className = 'email-details__image'
  imgEl.src = state.selectedEmail.img

  let headerEl = document.createElement('h2')
  headerEl.className = 'email-details__header'
  headerEl.textContent = state.selectedEmail.header

  let contentEl = document.createElement('p')
  contentEl.className = 'email-details__content'
  contentEl.textContent = state.selectedEmail.content

  mainEl.append(backButton, titleEl, imgEl, headerEl, contentEl)
}

function render () {
  if (state.selectedEmail) renderEmailDetails()
  else renderEmailList()
}

function runThisOnlyAtTheStart () {
  let logoEl = document.querySelector('.logo')
  if (logoEl) {
    logoEl.addEventListener('click', function () {
      deselectEmail()
      render()
    })
  }

  let inputEl = document.querySelector<HTMLInputElement>('.filter-input')
  if (inputEl) {
    inputEl.addEventListener('keydown', function (event) {
      if (inputEl == null) return
      if (event.key !== 'Enter') return

      state.filter = inputEl.value
    })
  }
}

runThisOnlyAtTheStart()
render()
