import S from '@sanity/desk-tool/structure-builder'
import { MdMenu } from 'react-icons/lib/md'
import { GoBrowser as PageIcon, GoHome, GoPerson, GoSettings } from 'react-icons/lib/go'

import React from 'react'
import blog from './src/structure/blog'

import PreviewIFrame from './src/components/previewIFrame'

const hiddenDocTypes = listItem =>
  !['navigationMenu', 'post', 'page', 'siteSettings', 'author'].includes(listItem.getId())

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
      S.documentListItem()
        .schemaType('siteSettings')
        .title('Site settings')
        .icon(GoSettings)
        .child(
          S.document()
            .schemaType('siteSettings')
            .documentId('siteSettings')
            .views([S.view.form(), PreviewIFrame()])
        ),
      S.documentListItem()
        .title('Frontpage')
        .schemaType('page')
        .icon(GoHome)
        .child(
          S.document()
            .schemaType('page')
            .documentId('frontpage')
            .views([S.view.form(), PreviewIFrame()])
        ),
      blog,
      S.listItem()
        .title('Authors')
        .icon(GoPerson)
        .schemaType('author')
        .child(S.documentTypeList('author').title('Authors')),
      S.listItem()
        .title('Navigation Menus')
        .icon(MdMenu)
        .schemaType('navigationMenu')
        .child(S.documentTypeList('navigationMenu').title('Navigation Menus')),
      S.listItem()
        .title('Page Builder')
        .icon(PageIcon)
        .schemaType('page')
        .child(S.documentTypeList('page').title('Pages')),
      // This returns an array of all the document types
      // defined in schema.js. We filter out those that we have
      // defined the structure above
      ...S.documentTypeListItems().filter(hiddenDocTypes)
    ])
