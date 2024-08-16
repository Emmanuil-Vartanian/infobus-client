const styledCustomPropsNames = [
  'active',
  'removeAsterisk',
  'maxWidth',
  'columns',
  'expanded',
  'shrinkValue',
  'hoverRow',
  'onClickCell',
  'textAlign',
  'flexDirection'
]

export const styledCustomProps = {
  shouldForwardProp: prop => !styledCustomPropsNames.includes(prop)
}
