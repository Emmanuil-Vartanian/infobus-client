import { TabList } from '@mui/lab'
import { Tab } from '@mui/material'
import { styled } from '@mui/system'
import CheckboxField from 'components/FormFields/CheckboxField'

export const TabListStyled = styled(TabList)`
  .MuiTabs-flexContainer {
    flex-wrap: wrap;
    gap: 15px 0px;
  }
`

export const TabStyled = styled(Tab)`
  &.MuiTab-root {
    background-color: #eff1f4;
  }
`

export const CheckboxFieldStyled = styled(CheckboxField)`
  margin: 20px 6px 0;
`

export const CheckboxFieldActivateStyled = styled(CheckboxFieldStyled)`
  .MuiFormControlLabel-label {
    font-size: 18px;
    height: auto;
  }
`

export const CheckboxFieldActivateTripStyled = styled(CheckboxFieldActivateStyled)`
  margin: 20px 6px 0 40px;
  .MuiFormControlLabel-label {
    font-size: 18px;
    height: auto;
  }
`

export const ActivateStopTitle = styled('div')`
  font-size: 14px;
`

export const DateCheckboxField = styled(CheckboxFieldStyled)`
  margin: 0 6px 0;
`
