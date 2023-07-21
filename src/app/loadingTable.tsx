'use client'
import React from 'react'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'
const loadingTable = () => {
  return (
    <SkeletonTheme baseColor="#202020" highlightColor="#444">
    <div>
      <Skeleton count={1} height={30}/>
      <div style={{display: 'flex'}}>
      <Skeleton count={10} height={25}/>
      </div>
    </div>
  </SkeletonTheme>
  )
}

export default loadingTable