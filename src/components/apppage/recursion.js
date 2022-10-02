// Recursion function which I don't understand ever since I wrote it

const findPageInPages = (id, pages) => {
  for (const page of pages.pages || []) {
    if (page._id === id) {
      return page;
    }
  }
  
  let pagetoreturn = null;
  for (const page of pages.pages) {
    if (page.children) {
      pagetoreturn = findPageInPages(id, page.children);
      if (pagetoreturn) {
        return pagetoreturn;
      }
    }
  }
};

const findPageParent = (id, pages) => {
  for (const page of pages.children?.pages || []) {
    if (page._id === id) {
      return pages;
    }
  }
  
  for (const page of pages.children?.pages || []) {
    let pagetoreturn = findPageParent(id, page);
    if (pagetoreturn) {
      return pagetoreturn;
    }
  }
};

module.exports = {
  findPageInPages,
  findPageParent
};







