import React, { useState, useEffect } from 'react'
import axios from 'axios'

export default function Gallery() {
    const [images, setImages] = useState([])
    const [index, setIndex] = useState(0) // Começa com 0 para o primeiro item
    const hasNext = index < images.length - 1

    useEffect(() => {
        const fetchImages = async () => {
            try {
                let response = await axios.get('https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&api_key=your_api_key')
                setImages(response.data.photos) // Armazenando todas as imagens
                console.log(response.data.photos)
            } catch (error) {
                console.log(error)
            }
        }

        fetchImages() // Chamando a função para buscar as imagens
    }, []) // Dependências vazias para executar apenas uma vez ao montar o componente

    function handleClick() {
        if (hasNext) {
            setIndex(index + 1) // Incrementa o índice para mostrar a próxima imagem
        } else {
            setIndex(0) // Reinicia para a primeira imagem
        }
    }

    return (
        <div>
            <h1>Gallery</h1>

            <button onClick={handleClick} className='text-3xl py-2 px-2 bg-black text-white'>
                Next
            </button>

            {images.length > 0 && (
                <div>
                    <img src={images[index].img_src} alt="Mars Rover" />
                    <p>Camera Name: {images[index].camera.name}</p> {/* Exibindo o nome da câmera */}

                    <h3>
                        {index + 1} of {images[index].rover.total_photos}
                    </h3>
                </div>

            
            )}
        </div>
    )
}
