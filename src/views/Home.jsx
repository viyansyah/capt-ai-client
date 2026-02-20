import { useState } from "react"
import BaseUrl from "../constant/BaseUrl"
import axios from "axios"

export default function Home() {
    const [prompt, setPrompt] = useState("")
    const [tone, setTone] = useState("formal")
    const [platform, setPlatform] = useState("Instagram")
    const [image, setImage] = useState(null)
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)
    const [generatedResult, setGeneratedResult] = useState(null)


    const handleUpdate = async () => {
        try {
            await axios.put(`${BaseUrl}/captions/${generatedResult.id}`, {}, {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                }
            })
            setGeneratedResult(null)
        } catch (error) {
            console.log(error.response)
        }
    }
    const handleDelete = async () => {
        try {
            await axios.delete(`${BaseUrl}/captions/${generatedResult.id}`, {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                }
            })
            setGeneratedResult(null)
        } catch (error) {
            console.log(error.response)
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        setGeneratedResult(null)

        try {
            const formData = new FormData()
            formData.append("prompt", prompt)
            formData.append("tone", tone)
            formData.append("platform", platform)
            formData.append("image", image)

            const response = await axios.post(`${BaseUrl}/captions`, formData, {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                }
            })
            console.log("GENERATED RESULT:", response.data)
            setGeneratedResult(response.data)


        } catch (error) {
            console.log(error.response)
        } finally {
            setLoading(false)
        }
    }



    return (
        <div className="mx-auto max-w-6xl px-4 py-8">

            {generatedResult && (
                <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                    <h3 className="mb-4 text-xl font-semibold text-gray-800">
                        Generated Result
                    </h3>
                    <img className="w-full h-64 object-contain rounded-lg" src={generatedResult.imageUrl} />

                    <div className="my-4 rounded-lg bg-gray-50 p-4 whitespace-pre-wrap">
                        {generatedResult.generatedText}

                    </div>

                    <div className="flex justify-center gap-4">
                        <button onClick={handleUpdate} className="rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white">
                            Update
                        </button>
                        <button onClick={handleDelete} className="rounded-lg bg-red-600 px-6 py-3 font-semibold text-white">
                            Delete
                        </button>
                    </div>
                </div>

            )}


            <form onSubmit={handleSubmit} className="mb-4 rounded-xl border border-gray-200 bg-white p-6 mt-8 shadow-sm">
                <h2 className=" text-2xl font-bold text-gray-800">
                    Generate New Content
                </h2>


                <div className="mb-6">
                    <label className="mb-2 block font-medium text-gray-700">
                        Platform
                    </label>
                    <select
                        value={platform}
                        onChange={(e) => setPlatform(e.target.value)}
                        className="w-full rounded-lg border border-gray-300 p-3"
                    >
                        <option value="Instagram">Instagram</option>
                        <option value="TikTok">TikTok</option>
                        <option value="LinkedIn">LinkedIn</option>
                        <option value="Twitter">Twitter</option>
                    </select>
                </div>


                <div className="mb-6">
                    <label className="mb-2 block font-medium text-gray-700">
                        Tone
                    </label>
                    <select
                        value={tone}
                        onChange={(e) => setTone(e.target.value)}
                        className="w-full rounded-lg border border-gray-300 p-3"
                    >
                        <option value="formal">Formal</option>
                        <option value="casual">Casual</option>
                        <option value="funny">Funny</option>
                    </select>
                </div>


                <div className="mb-6">
                    <label className="mb-2 block font-medium text-gray-700">
                        Description
                    </label>
                    <textarea
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        placeholder="e.g., A photo of a sunset on the beach..."
                        rows="4"
                        required
                        className="w-full rounded-lg border border-gray-300 p-3"
                    />
                </div>


                <div className="mb-6">
                    <label className="mb-2 block font-medium text-gray-700">
                        Upload Image
                    </label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setImage(e.target.files[0])}
                        className="w-full"
                    />
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full rounded-lg bg-indigo-600 px-6 py-3 font-semibold text-white"
                >
                    {loading ? "Generating..." : "Generate Caption"}
                </button>
            </form>

            {error && (
                <div className="mb-4 rounded-lg bg-red-100 p-4 text-red-700">
                    {error}
                </div>
            )}


        </div>
    )
}