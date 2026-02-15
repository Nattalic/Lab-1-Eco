const getAnimeDetail = async () => {
    const status = document.querySelector("#status")
    const container = document.querySelector("#app")

    // Loadinggg :3 (igual)
    const showLoading = () => {
        status.style.display = "flex"
    }

    const hideLoading = () => {
        status.style.display = "none"
    }


    try {
        const params = new URLSearchParams(window.location.search)
        const id = params.get("id")

        showLoading()
        //Traer fetch de naimesss
        const response = await fetch(`https://api.jikan.moe/v4/anime/${id}/full`)

        if (!response.ok) {
            throw new Error("API error")
        }

        const result = await response.json()
        const anime = result.data

        document.body.style.backgroundImage = `
        linear-gradient(rgba(0, 0, 0, 0.74), rgba(27, 27, 27, 0.34)),
        url(${anime.images.jpg.large_image_url})
        `

        hideLoading()

        // Empty state
        if (!anime) {
            container.className = "empty-state"
            container.innerHTML = `<p class="error-msg">Anime not found ( ˶°ㅁ°) !!</p>`
            return
        }

        const title = document.createElement("h2")
        title.innerHTML = anime.title

        const img = document.createElement("img")
        img.src = anime.images.jpg.large_image_url
        img.width = 250

        const subtitleTitles = document.createElement("h3")
        subtitleTitles.innerHTML = "Titles"

        const list = document.createElement("ul")

        const titles = anime.titles || []
        if (titles.length > 0) {
            for (let t of titles) {
                const li = document.createElement("li")
                li.innerHTML = t.title
                list.appendChild(li)
            }
        } else {
            // Empty state
            const li = document.createElement("li")
            li.className = "empty-state"
            li.innerHTML = "No titles available ( ˶°ㅁ°) !!"
            list.appendChild(li)
        }

        const subtitleSynopsis = document.createElement("h3")
        subtitleSynopsis.innerHTML = "Synopsis"

        const synopsis = document.createElement("p")
        // Empty state

        synopsis.innerHTML = anime.synopsis || "No synopsis available ( ˶°ㅁ°) !!"

        const started = document.createElement("p")
        started.className = "date-start"
        started.innerHTML = "Started: " + (anime.aired.from || "Unknown")

        const ended = document.createElement("p")
        ended.className = "date-end"
        ended.innerHTML = "Ended: " + (anime.aired.to || "Unknown")

        const backBtn = document.createElement("button")
        backBtn.innerHTML = "Back"
        backBtn.onclick = () => {
            window.location.href = "index.html"
        }

        container.appendChild(title)
        container.appendChild(img)
        container.appendChild(subtitleTitles)
        container.appendChild(list)
        container.appendChild(subtitleSynopsis)
        container.appendChild(synopsis)
        container.appendChild(started)
        container.appendChild(ended)
        container.appendChild(backBtn)


    } catch (error) {
        hideLoading()
        container.innerHTML = `<p class="error-msg">Something went wrong, try again :(</p>`
    }
}

getAnimeDetail()
