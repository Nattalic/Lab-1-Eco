console.log("Hiiii worlddd")

const getAnimes = async () => {
    const status = document.querySelector("#status")
    const container = document.querySelector("#app")

    // Loadinggg :3

    const showLoading = () => {
        status.style.display = "flex"
    }

    const hideLoading = () => {
        status.style.display = "none"
    }

    try {
        //Fecth animeeee 
        showLoading()
        const response = await fetch("https://api.jikan.moe/v4/anime")

        // Estado de errore 
        if (!response.ok) {
            throw new Error("API error")
        }

        const result = await response.json()
        const animes = result.data

        hideLoading()

        // Empty state
        if (animes.length === 0) {
            container.innerHTML = `<p class="error-msg">No animes found ( ˶°ㅁ°) !!</p>`
            return
        }

        //los resultados de las cards
        status.innerHTML = ""

        for (let anime of animes) {
            const card = document.createElement("div")

            const title = document.createElement("h3")
            title.innerHTML = anime.title

            const img = document.createElement("img")
            img.src = anime.images.jpg.large_image_url
            img.width = 150

            const synopsis = document.createElement("p")
            synopsis.innerHTML = anime.synopsis || "No synopsis available"

            const button = document.createElement("button")
            button.innerHTML = "View more"
            button.onclick = () => {
                window.location.href = `detail.html?id=${anime.mal_id}`
            }

            card.appendChild(title)
            card.appendChild(img)
            card.appendChild(synopsis)
            card.appendChild(button)

            container.appendChild(card)
        }

    } catch (error) {
        hideLoading()
        container.innerHTML = `<p class="error-msg">Something went wrong, try again :(</p>`
    }
}

getAnimes()
