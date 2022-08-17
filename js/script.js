const form = document.getElementById('generate-form')
const qr = document.getElementById('qrcode')
const spinner = document.getElementById('spinner')

form.addEventListener('submit', onGenerateSubmit)

function onGenerateSubmit(e) {
  e.preventDefault()
  clearUi()
  const url = document.getElementById('url').value
  const size = document.getElementById('size').value

  if (url === '') {
    alert('Please enter an url')
  } else {
    showSpinner()
    setTimeout(() => {
      hideSpinner()

      generateQrCode(url, size)
      setTimeout(() => {
        const saveUrl = qr.querySelector('img').src
        createSaveBtn(saveUrl)
      }, 50)
    }, 1000)
  }
}

const generateQrCode = (url, size) => {
  const qrcode = new QRCode('qrcode', {
    text: url,
    width: size,
    height: size,
  })
}

const showSpinner = () => {
  spinner.style.display = 'block'
}
const hideSpinner = () => {
  spinner.style.display = 'none'
}

const clearUi = () => {
  qr.innerHTML = ''
  const saveBtn = document.getElementById('save-link')

  if (saveBtn) {
    saveBtn.remove()
  }
}

const createSaveBtn = (saveUrl) => {
  const link = document.createElement('a')
  link.id = 'save-link'
  link.classList = 'bg-red-500 hover:bg-red-700 text-white font-bold py-2 rounded w-1/3 m-auto my-5'

  link.href = saveUrl
  link.download = 'qrcode'
  link.innerHTML = 'Save Image'
  document.getElementById('generated').appendChild(link)
}
