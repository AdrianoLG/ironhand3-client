import { NOTE_FORM_TEXT } from '../utils/noteFormMessages'

import type { NoteListItem } from '../types/types'

interface NoteCardProps {
  note: NoteListItem
  onOpen: (note: NoteListItem) => void
}

const NoteCard = ({ note, onOpen }: NoteCardProps) => (
  <article
    key={note._id}
    className='bg-secondaryLightest border-secondaryLighter hover:bg-primary rounded-md border p-3 hover:cursor-pointer'
    onClick={() => onOpen(note)}
  >
    <h3 className='text-secondary text-center text-sm leading-tight font-semibold'>
      {note.title}
    </h3>
    <p className='text-secondaryLight mt-1 text-center text-xs'>
      {note.category || '-'}
    </p>
    <div className='mt-2 flex flex-wrap justify-center gap-1'>
      {(note.tags ?? []).length > 0 ? (
        (note.tags ?? []).map(tag => (
          <span
            key={`${note._id}-${tag}`}
            className='bg-warn text-accent rounded px-1 text-[10px]'
          >
            #{tag}
          </span>
        ))
      ) : (
        <span className='text-secondaryLight text-[10px]'>
          {NOTE_FORM_TEXT.tagsLabel.toLowerCase()}: -
        </span>
      )}
    </div>
  </article>
)

export default NoteCard
