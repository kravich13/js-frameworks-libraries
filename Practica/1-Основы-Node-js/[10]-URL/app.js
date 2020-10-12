// new URL(input[,base])

// const myUrl = new URL("/foo", "https://kravich.com/")
// console.log(myUrl.href) // https://kravich.com/foo


// const myURL = new URL({ toString: () => 'https://kravich.com/' })
// console.log(myURL.href) // https://kravich.com/


// let myURL = new URL("http://Kravich.com/", "https://kravich.com/")
// console.log(myURL.href) // http://kravich.com/


// myURL = new URL("https://Kravich.com/", "https://kravich.com/")
// console.log(myURL.href) // https://kravich.com/


// myURL = new URL("foo://Kravich.com/", "https://kravich.com/")
// console.log(myURL.href) // foo://Kravich.com/


// myURL = new URL("http:Kravich.com/", "https://kravich.com/")
// console.log(myURL.href) // http://kravich.com/


// myURL = new URL("https:Kravich.com/", "https://kravich.com/")
// console.log(myURL.href) // https://kravich.com/Kravich.com/


// myURL = new URL("foo:Kravich.com/", "https://kravich.com/")
// console.log(myURL.href) // foo:Kravich.com/




// url.hash

// const myURL = new URL("https://kravich.com/foo#bar")
// console.log(myURL.hash) // #bar

// myURL.hash = "baz"
// console.log(myURL.href) // https://kravich.com/foo#baz




// url.host

// const myURL = new URL("https://kravich.com:83/foo")
// console.log(myURL.host) // kravich.com:83

// myURL.host = "kravich.com:13"
// console.log(myURL.href) // https://kravich.com:13/foo




// url.hostname

// const myURL = new URL("https://kravich.com:83/foo")
// console.log(myURL.hostname) // kravich.com

// myURL.hostname = "kravich.com:13"
// console.log(myURL.href) // https://kravich.com:13/foo




// url.origin

// const myURL = new URL("https://kravich.com/foo/bar?baz")
// console.log(myURL.origin) // https://kravich.com




// url.password

// const myURL = new URL("https://kravich:13@gmail.com")
// console.log(myURL.password) // 13

// myURL.password = "666"
// console.log(myURL.href) // https://kravich:666@gmail.com/




// url.pathname

// const myURL = new URL("https://kravich.com/abc/xyz?123")
// console.log(myURL.pathname) // /abc/xyz

// myURL.pathname = "/abcdef"
// console.log(myURL.href) // https://kravich.com/abcdef?123




// url.protocol

// const myURL = new URL("http://kravich.com")
// myURL.protocol = "https"
// console.log(myURL.href) // https://kravich.com/




// url.username

// const myURL = new URL("http://kravich:13@gmail.com")
// console.log(myURL.username) // kravich

// myURL.username = "Vlad-Kravich"
// console.log(myURL.href) // http://Vlad-Kravich:13@gmail.com/
