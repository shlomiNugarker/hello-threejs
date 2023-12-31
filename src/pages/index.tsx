import { SimpleShape } from '@/cmps/SimpleShape'
import Head from 'next/head'
import { useState } from 'react'
import * as THREE from 'three'

export default function Home() {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="main-page">
        <div className="">
          <SimpleShape />
        </div>
      </main>
    </>
  )
}
