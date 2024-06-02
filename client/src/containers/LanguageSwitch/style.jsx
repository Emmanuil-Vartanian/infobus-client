import { styled } from '@mui/system'

export const LanguagesBlock = styled('header')`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
`

export const Language = styled('div')(
  ({ active }) => `
  display: flex;
  align-items: center;
  justify-content: center;
  height: 32px;
  width: 36px;
  border: 1px solid transparent;
  background-color: ${active ? '#fff' : 'transparent'};
  color: ${active ? '#000' : '#fff'};
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s;
  :hover {
    border: 1px solid #fff;
    border-radius: 4px;
  }
`
)
