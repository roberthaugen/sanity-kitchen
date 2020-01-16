import S from '@sanity/desk-tool/structure-builder'
import MdSettings from 'react-icons/lib/md/settings'
import MdPerson from 'react-icons/lib/md/person'
import MdHome from 'react-icons/lib/md/home'

import PreviewPaneChild from './previewPaneChild'
import React from 'react'

const hiddenDocTypes = listItem =>
  !['category', 'author', 'post', 'siteSettings'].includes(listItem.getId())

const baseUrl =
  process.env.NODE_ENV === 'production'
    ? 'https://sanity-kitchen.netlify.com'
    : 'http://localhost:8000'

// Helper function to create an S.view.component for rendering an iframe with an url.
// We use this for Preview pane
const previewUrl = url =>
  S.view
    .component(() => <iframe style={{ width: '100%', height: '100%' }} frameBorder="0" src={url} />)
    .title('Preview')

export default () =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Site settings')
        .icon(MdSettings)
        .child(
          S.document()
            .schemaType('siteSettings')
            .documentId('siteSettings')
            .views([S.view.form(), previewUrl(baseUrl)])
        ),
      S.listItem()
        .title('Frontpage')
        .icon(MdHome)
        .child(
          S.document()
            .schemaType('page')
            .documentId('frontpage')
            .views([S.view.form(), previewUrl(baseUrl)])
        ),
      S.listItem()
        .title('Blog posts')
        .schemaType('post')
        .child(
          S.documentTypeList('post')
            .title('Blog posts')
            .child(documentId => PreviewPaneChild('post', documentId))
        ),
      S.listItem()
        .title('Authors')
        .icon(MdPerson)
        .schemaType('author')
        .child(S.documentTypeList('author').title('Authors')),
      S.listItem()
        .title('Categories')
        .schemaType('category')
        .child(S.documentTypeList('category').title('Categories')),
      // This returns an array of all the document types
      // defined in schema.js. We filter out those that we have
      // defined the structure above
      ...S.documentTypeListItems().filter(hiddenDocTypes)
    ])
