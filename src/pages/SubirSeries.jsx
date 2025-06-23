import React from 'react'
import SubirManhwas from '../components/SubirManhwas'
import SubirCapitulo from '../components/SubirCapitulo'


const SubirSeries = () => {
  return (
    <>
        <SubirManhwas/>
        <div className='container py-5'>
        <SubirCapitulo/>
        </div>
    </>
  )
}

export default SubirSeries