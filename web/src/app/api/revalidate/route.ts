import { revalidateTag } from 'next/cache'
import { parseBody } from 'next-sanity/webhook'
import { type NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const { isValidSignature, body } = await parseBody<{ _type: string }>(
      req,
      process.env.SANITY_REVALIDATE_SECRET
    )

    if (!isValidSignature) {
      return new Response('Invalid signature', { status: 401 })
    }

    if (!body?._type) {
      return new Response('Bad Request: Missing _type', { status: 400 })
    }

    // Revalidate the cache tag matching the document type (e.g. 'work' or 'profile')
    revalidateTag(body._type, { expire: 0 })

    return NextResponse.json({ revalidated: true, now: Date.now(), body })
  } catch (err) {
    console.error('Revalidation error:', err)
    return new Response('Internal Server Error', { status: 500 })
  }
}
