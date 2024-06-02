const ownerStateStyle = (ownerState, variant, color, style) => {
  return ownerState.variant === variant && ownerState.color === color && style
}

const themeComponents = {
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        root: ({ theme: { palette } }) => ({
          height: '44px',
          maxHeight: '44px',
          background: palette.common.white,
          borderRadius: '4px',
          '&:hover': {
            '.MuiOutlinedInput-notchedOutline': {
              borderColor: '#63060a'
            }
          },
          '&.Mui-focused': {
            '.MuiOutlinedInput-notchedOutline': {
              borderColor: '#63060a'
            },
            '.MuiOutlinedInput-input': {
              caretColor: '#63060a'
            }
          },
          '&.Mui-error': {
            '.MuiOutlinedInput-notchedOutline': {
              borderColor: palette.common.red,
              borderWidth: 2
            }
          },
          // '&.Mui-disabled': {
          //   background: palette.pocket.grey['3'],
          //   '.MuiOutlinedInput-notchedOutline': {
          //     borderColor: palette.pocket.grey['15']
          //   },
          //   '.MuiOutlinedInput-input': {
          //     cursor: 'not-allowed'
          //   }
          // },
          '&.MuiInputBase-adornedStart': {
            paddingLeft: '12px'
          },
          '.MuiInputBase-inputAdornedStart': {
            paddingLeft: '12px'
          },
          '&.table-select': {
            '.MuiSelect-select': {
              fontSize: '11px'
            }
          }
        }),
        input: ({ ownerState }) => ({
          padding: '12px 14px',
          fontSize: '13px',
          ...(ownerState?.placeholder && {
            padding: '12px',
            overflow: 'hidden',
            textOverflow: 'ellipsis'
          })
        }),
        notchedOutline: ({ theme: { palette } }) => ({
          // borderColor: palette.pocket.grey['15'],
          borderRadius: '4px',
          '&:hover': {
            borderColor: palette.common.red
          },
          '> legend > span': {
            fontSize: '9px'
          }
        })
      }
    },
    MuiInputLabel: {
      styleOverrides: {
        root: ({ theme: { palette } }) => ({
          left: 0,
          color: 'grey',
          lineHeight: '12px',
          fontSize: 12,
          letterSpacing: '0.4px',
          maxWidth: 'calc(88% - 20px)',
          '&.Mui-focused': {
            color: '#63060a',
            '&.table-select-lable': {
              transform: 'translate(10px, -9px) scale(0.75)'
            }
          },
          '&.Mui-error': {
            color: palette.common.red
          },
          '&.table-select-lable': {
            fontSize: 12,
            lineHeight: '16px',
            transform: 'translate(10px, 8px) scale(1)',
            '&.MuiInputLabel-shrink': {
              transform: 'translate(12px, -6px) scale(0.75)'
            }
          }
        }),
        shrink: {
          fontSize: 13,
          padding: '0px',
          lineHeight: '24px'
        }
      }
    },
    MuiButton: {
      styleOverrides: {
        root: ({ theme: { palette }, ownerState }) => ({
          // minWidth: '48px',
          borderRadius: 4,
          boxShadow: 'none',
          lineHeight: '20px',
          ...(ownerState.size === 'large' && {
            padding: `12px 24px`,
            fontSize: '12px'
          }),
          ...(ownerState.size === 'medium' && {
            padding: '16px'
          }),
          ...(ownerState.size === 'small' && {
            padding: `8px 12px`,
            minWidth: '38px',
            height: '36px',
            letterSpacing: '0.1px',
            fontSize: '12px',
            '.MuiButton-startIcon': {
              marginRight: '4px',
              marginLeft: '-8px',
              fontSize: '16px'
            },
            '&.MuiButton-root': {
              textTransform: 'none'
            },
            '.MuiSvgIcon-root': {
              fontSize: '16px'
            }
          }),
          ...(ownerState.startIcon && {
            padding: `12px 16px`
          }),
          ...ownerStateStyle(ownerState, 'contained', 'primary', {
            backgroundColor: '#63060a',
            color: palette.common.white,
            '&:hover': {
              backgroundColor: `#721e22 !important`
            }
          }),
          ...ownerStateStyle(ownerState, 'outlined', 'primary', {
            backgroundColor: palette.common.white,
            color: '#63060a',
            border: `1px solid #63060a`,
            ':hover': {
              color: palette.common.white,
              border: `1px solid #63060a`
            }
          }),
          ...ownerStateStyle(ownerState, 'text', 'primary', {
            color: '#63060a',
            padding: '0px',
            ':hover': {
              backgroundColor: 'inherit !important'
            }
          }),
          '&:hover': {
            boxShadow: 'none',
            backgroundColor: '#721e22'
          },
          '&.Mui-disabled': {
            cursor: 'not-allowed',
            pointerEvents: 'auto',
            ...ownerStateStyle(ownerState, 'contained', 'primary', {
              color: palette.common.white
              // backgroundColor: palette.pocket.primary['40']
            }),
            ...ownerStateStyle(ownerState, 'outlined', 'primary', {
              // color: palette.pocket.primary['40'],
              // borderColor: palette.pocket.primary['40'],
              '&:hover': {
                backgroundColor: `${palette.common.white} !important`
              }
            })
          }
        }),
        startIcon: {
          marginLeft: '0px',
          '&>*:nth-of-type(1)': {
            fontSize: 20
          }
        }
      }
    },
    MuiFormControlLabel: {
      styleOverrides: {
        root: {
          '&.Mui-disabled': {
            cursor: 'not-allowed'
          }
        },
        label: {
          // color: palette.pocket.grey['50'],
          height: '20px'
        }
      }
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          // backgroundColor: palette.pocket.menu['100'],
          display: 'block'
        }
      }
    },
    // MuiDialog: {
    //   styleOverrides: {
    //     paper: ({ theme: { palette } }) => ({
    //       margin: `${spacing(8)} ${spacing(15)}`,
    //       maxWidth: spacing(389),
    //       borderRadius: spacing(4),
    //       '.MuiDialogTitle-root': {
    //         fontWeight: 500,
    //         fontSize: 32,
    //         lineHeight: '40px',
    //         textAlign: 'center',
    //         color: palette.pocket.grey['100'],
    //         padding: `${spacing(8)} ${spacing(10)} ${spacing(6)}`
    //       },
    //       '.MuiDialogContent-root': {
    //         padding: `${spacing(0)} ${spacing(10)}`,
    //         marginBottom: spacing(8),
    //         border: 'none'
    //       }
    //     })
    //   }
    // },
    MuiCircularProgress: {
      styleOverrides: {
        root: {
          color: '#63060a'
        }
      }
    },
    MuiLinearProgress: {
      styleOverrides: {
        root: {
          backgroundColor: '#63060a70'
        },
        bar1Indeterminate: {
          backgroundColor: '#63060a'
        },
        bar2Indeterminate: {
          backgroundColor: '#63060a'
        }
      }
    },
    MuiSelect: {
      styleOverrides: {
        root: {
          '&.table-select': {
            minHeight: 'auto',
            '.MuiSelect-select': {
              padding: `4px 32px 4px 12px`,
              paddingRight: '32px',
              lineHeight: '24px'
            }
          }
        }
      }
    },
    MuiAutocomplete: {
      styleOverrides: {
        root: {
          height: '44px',
          '.MuiOutlinedInput-root .MuiAutocomplete-input': {
            padding: '3px'
          }
        },
        listbox: {
          padding: '6px 0',
          maxHeight: '30vh',
          '.MuiAutocomplete-option': {
            fontSize: '13px',
            paddingLeft: '12px',
            paddingRight: '12px',
            paddingTop: '4px',
            paddingBottom: '4px',
            '.MuiCheckbox-root': {
              padding: '6px'
            }
          }
        },
        inputRoot: {
          '&.Mui-disabled': {
            cursor: 'not-allowed'
          }
        },
        loading: {
          fontSize: '14px',
          padding: '12px 14px'
        }
      }
    },
    MuiList: {
      styleOverrides: {
        root: {
          paddingTop: '4px',
          paddingBottom: '4px',
          '.MuiMenuItem-root': {
            fontSize: '14px',
            paddingLeft: '8px',
            paddingRight: '8px',
            paddingTop: '4px',
            paddingBottom: '4px',
            '.MuiCheckbox-root': {
              padding: '6px'
            }
          }
        }
      }
    }
  }
}

export default themeComponents
