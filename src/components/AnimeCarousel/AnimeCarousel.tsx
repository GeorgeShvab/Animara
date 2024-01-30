'use client'

import React, { FC } from 'react'
import Slider, { Settings } from 'react-slick'
import AnimeCarouselItem, { CarouselItemProps } from './AnimeCarouselItem'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

const settings: Settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: false,
  autoplay: true,
  autoplaySpeed: 10000,
}

interface Props {
  data: CarouselItemProps[]
}

const AnimeCarousel: FC<Props> = ({ data }) => {
  return (
    <Slider {...settings}>
      {data.map((item) => (
        <AnimeCarouselItem key={item.id} {...item} />
      ))}
    </Slider>
  )
}

export default AnimeCarousel
