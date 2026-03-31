type LayoutProps = {
  topBarSlot?: React.ReactNode
  contentSlot?: React.ReactNode
  bottomBarSlot?: React.ReactNode
}

export function Layout(props: LayoutProps) {
  const { topBarSlot, contentSlot, bottomBarSlot } = props

  return (
    <div>
      {topBarSlot}
      <main>
        {contentSlot}
      </main>
      {bottomBarSlot}
    </div>
  )
}