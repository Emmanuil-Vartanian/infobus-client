import React from 'react'
import { useTranslation } from 'react-i18next'

import { ButtonBlock } from './style'

import Popup from '../Popup'
import Button from 'components/Button'
import LineLoader from 'components/LineLoader'
import useLoadingEffect from 'services/hooks/useLoadingEffect'
import { EFFECT_LOADING } from 'constants/effectLoading'

const DeleteModal = ({ open, onClose, handleDelete }) => {
  const { t } = useTranslation()
  const loading = useLoadingEffect(EFFECT_LOADING.DELETE)

  return (
    <Popup
      content={
        loading ? (
          <LineLoader />
        ) : (
          <ButtonBlock>
            <Button onClick={handleDelete}>{t('common.yes')}</Button>
            <Button onClick={onClose}>{t('common.no')}</Button>
          </ButtonBlock>
        )
      }
      open={open}
      onClose={onClose}
      title={t('common.delete')}
      maxWidthStyle={100}
    />
  )
}

export default DeleteModal
