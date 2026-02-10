const getAnimes = async () => {

    // link de animes api :3 !!!
    const response = await fetch(
        "https://api.jikan.moe/v4/anime"
    )

    if (response.ok) {
        const result = await response.json()
        const animes = result.data
        const container = document.querySelector('#app')

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

        console.log(animes)
    } else {
        console.error("Failed to fetch animes ;(")
    }
}

getAnimes()
