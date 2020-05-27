function linkActive(id, pathname) {
  //console.log(`linkActive(id=${id}, pathname=${pathname}) was called`)
  const link = document.querySelector(id)
  //console.log(link)

  if (document.location.pathname.includes(pathname)) {
    //console.log(`if was executed for id ${id} and pathname ${pathname}`)
    link.classList.add("active")
  }
}


linkActive('#about', "/about")
linkActive('#recipes', "/recipes")