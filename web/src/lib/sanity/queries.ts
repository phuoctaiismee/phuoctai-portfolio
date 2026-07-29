import { defineQuery } from 'next-sanity'

export const POSTS_QUERY = defineQuery(
  `*[_type == "post" && defined(slug.current)] | order(publishedAt desc, _createdAt desc){
    _id,
    title,
    slug,
    publishedAt,
    mainImage {
      asset->{
        _id,
        url,
        metadata {
          lqip,
          dimensions { width, height }
        }
      },
      alt
    },
    author->{
      name,
      image {
        asset->{
          _id,
          url
        }
      }
    }
  }`
)

export const POST_QUERY = defineQuery(
  `*[_type == "post" && slug.current == $slug][0]{
    _id,
    title,
    slug,
    publishedAt,
    mainImage {
      asset->{
        _id,
        url,
        metadata {
          lqip,
          dimensions { width, height }
        }
      },
      alt
    },
    author->{
      name,
      image {
        asset->{
          _id,
          url
        }
      }
    },
    body
  }`
)

export const PROFILE_QUERY = defineQuery(
  `*[_type == "profile"][0]{
    _id,
    firstName,
    lastName,
    displayName,
    headline,
    email,
    "avatarUrl": avatar.asset->url,
    "cvUrl": cvFile.asset->url,
    shortBio,
    longBio,
    aboutStatement,
    "aboutImageUrl": aboutImage.asset->url,
    aboutDescription,
    skillsGroups[] {
      _key,
      category,
      skills
    },
    services[] {
      _key,
      name,
      "image": image.asset->url
    },
    faqs[] {
      question,
      answer
    }
  }`
)

export const FEATURED_WORKS_QUERY = defineQuery(
  `*[_type == "work" && defined(slug.current) && featured == true] | order(year desc, _createdAt desc)[0...$limit] {
    _id,
    title,
    "slug": slug.current,
    coverImage,
    industry,
    year
  }`
)

export const ALL_WORKS_QUERY = defineQuery(
  `*[_type == "work" && defined(slug.current)] | order(year desc, _createdAt desc) {
    _id,
    title,
    "slug": slug.current,
    coverImage,
    industry,
    year
  }`
)

export const WORK_DETAIL_QUERY = defineQuery(
  `*[_type == "work" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    coverImage,
    industry,
    client,
    year,
    experience,
    liveLink,
    githubLink,
    figmaLink,
    appStoreLink,
    playStoreLink,
    projectType,
    skills,
    aboutRichText,
    aboutGallery,
    challengeRichText,
    challengeGallery,
    resultRichText,
    resultGallery,
    testimonialQuote,
    testimonialAuthorName,
    testimonialAuthorRole,
    testimonialAuthorAvatar
  }`
)

export const RELATED_WORKS_QUERY = defineQuery(
  `*[_type == "work" && slug.current != $slug && defined(slug.current)][0...$limit] {
    _id,
    title,
    "slug": slug.current,
    coverImage,
    industry,
    year
  }`
)

export const WORK_QUERY = defineQuery(
  `*[_type == "work"][0]{ ... }`
)

export const APP_SETTINGS_QUERY = defineQuery(
  `*[_type == "app-settings"][0]{ ... }`
)

export const EXPERIENCES_QUERY = defineQuery(
  `*[_type == "experience"] | order(startDate desc) {
    _id,
    companyName,
    role,
    location,
    startDate,
    currentJob,
    endDate,
    description,
    techStack
  }`
)