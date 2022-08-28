// Recursion function which I don't understand ever since I wrote it

const findPageInPages = (id, pages) => {
  for (const page of pages.pages || []) {
    if (page._id === id) {
      return page
    }
  }
  
  let pagetoreturn = null
  for (const page of pages.pages) {
    pagetoreturn = findPageInPages(id, page.children)
    if (pagetoreturn) {
      return pagetoreturn
    }
  }
}

module.exports = {
  findPageInPages,
}