import Head from "next/head"
import { useState } from "react"
import ClickAwayListener from 'react-click-away-listener'
import ReactMarkdown from "react-markdown"
import rehypeKatex from "rehype-katex"
import remarkGfm from "remark-gfm"
import remarkMath from "remark-math"
import Drawer from "../components/drawer"
import { Dots, MagnifyingGlass, Pen, Save, Add } from "../components/icons"
import React, { useEffect } from "react"

function Home() {
  const [reader, setReader] = useState(false)
  const [showDraw, setShowDraw] = useState(false)
  const [docName, setDocName] = useState("Hello, Tilde!")
  const [doc, setDoc] = useState<string>(``)

  const save = () => {
    let md = localStorage.setItem("note",
      JSON.stringify({
        docName,
        doc
      })
    )
  }

  const getNote = () => {
    localStorage.getItem("document")
    if (document) return JSON.parse(doc)[docName]
  }

  useEffect(() => {
    const getAllNotes = () => {
      localStorage.getItem("note")
      if (document) return Object.keys (JSON.parse(doc))
    }
  }, [])

  function NoteSidebar() {
    save()
    return (
      <div className="rounded-md hover:bg-gray-100 cursor-pointer py-1 w-max px-4">
        <h1>{docName}</h1>
      </div>
    )
  }

  return (
    <div>
      <Head>
        <title>Tilde</title>
      </Head>
      <div className="float-right m-6 space-x-4">
      <button
          onClick={() => save()}
        >
          <Save/>
      </button>
        <button
          onClick={() => setReader(setReader => !setReader)}
          className="cursor-pointer"
        >
          {!reader && (
            <MagnifyingGlass />
          )}
          {reader && (
            <Pen />
          )}
        </button>
        <button
          onClick={() => setShowDraw(true)}
        >
          <Dots />
        </button>

        {showDraw && (
          <ClickAwayListener onClickAway={() => setShowDraw(false)}>
            <Drawer />
          </ClickAwayListener>
        )}
      </div>
      <div className="flex justify-center bg-red-400 mr-8 space-x-2 h-screen">
        <div className="bg-gray-50 pt-16 h-auto border-r mr-16 w-1/3">
              <h1 className="font-semibold text-3xl ml-8">All notes</h1>
              <div className="mt-8 ml-4 space-y-2">
                <NoteSidebar/>
              </div>
            <button
              className="float-end absolute bottom-0 text-gray-500 text-lg flex mb-4 ml-4"
              onClick={() => alert("Gadzooks!")}
            >
              <Add/>&nbsp; New note
            </button>
        </div>

        {!reader && (
          <textarea
            className="w-screen outline-0 cursor-text pt-16 text-lg"
            onChange={(e) => setDoc(e.target.value)}
            value={doc || ""}
            placeholder="Your best ideas here..."
            autoFocus
          />
        )}
        {reader && (
          <ReactMarkdown
            children={doc}
            remarkPlugins={[[remarkGfm, { singleTilde: true }], [remarkMath]]}
            rehypePlugins={[rehypeKatex]}
            className="w-screen pt-16 text-lg"
            components={{
              a({ children }) {
                return (
                  <a
                    href={`${children}`}
                    target="_blank"
                    className="cursor-pointer text-blue-600 hover:underline"
                  >
                    {children}
                  </a>
                )
              },
              h1({ children }) {
                return (
                  <h1 className="text-6xl font-semibold py-8">
                    {children}
                  </h1>
                )
              },
            }}
          />
        )}
      </div>
    </div>
  );
}

export default Home;
