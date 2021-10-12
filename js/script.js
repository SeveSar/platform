document.addEventListener("DOMContentLoaded", function(event) {
  const mobileMenu = document.querySelector('.mobile-menu');
const burgerBtn = document.querySelector('.burger');
const mobileMenuOverlay = document.querySelector('.mobile-menu__overlay');
const mobileMenuCloseBtn = document.querySelector('.mobile-menu__close');
if (mobileMenu) {
  function toggleMobileMenu() {
    mobileMenu.classList.toggle('show');
    document.body.classList.toggle('no-scroll');
    mobileMenuOverlay.classList.toggle('show')
  }
  burgerBtn.addEventListener('click', toggleMobileMenu)
  mobileMenuOverlay.addEventListener('click', toggleMobileMenu)
  mobileMenuCloseBtn.addEventListener('click', toggleMobileMenu)
}
;
  // team-news slider

const teamNewsContainers= document.querySelectorAll('.team-news');

if (teamNewsContainers.length) {
  teamNewsContainers.forEach(container => {
    new Swiper(container, {
      breakpoints: {
        320: {
          slidesPerView: 2.8,
          spaceBetween: 0,
        },
        375: {
          slidesPerView: 3,
          spaceBetween: 0,
        },
        416: {
          slidesPerView: 3.5,
          spaceBetween: 0,
        },

        576: {
          slidesPerView: 4.5,
          spaceBetween: 0,
        },
        768: {
          slidesPerView: 6,
          spaceBetween: 16
        },
        992: {
          slidesPerView: 3.5,
          spaceBetween: 16
        },
        1161: {
          slidesPerView: 4,
          spaceBetween: 16
        },
        1240: {
          slidesPerView: 5.5,
          spaceBetween: 16
        }
      }
    });
  })

}

// cards slider
const cardsContainer = document.querySelector('.cards__container');

if (cardsContainer) {
  const cardsSlider = new Swiper(cardsContainer, {
    slidesPerView: 2.4,
    spaceBetween: 24,
    breakpoints: {
      407: {
        slidesPerView: 3,
        spaceBetween: 24
      },
      540: {
        slidesPerView: 4,
        spaceBetween: 24
      },
      700: {
        slidesPerView: 5,
        spaceBetween: 24
      },
      992: {
        slidesPerView: 3,
        spaceBetween: 24
      },
      1050: {
        slidesPerView: 3.5,
        spaceBetween: 24
      },
      1187: {
        slidesPerView: 4.5,
        spaceBetween: 24
      },
    }
  });
}
;
  const modalOverlay = document.querySelector('.modal-overlay');
const modalOverlaySignIn = document.querySelector('.modal-overlay--sign-in');
const signInBtn = document.querySelector('[js-sign-btn]');
const signUpBtn = document.querySelector('[js-sign-up-btn]');
const modalOverlaySignUp = document.querySelector('.modal-overlay--sign-up');
function modalClose(modalOverlay) {
  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay || e.target.closest('.modal__close') || e.target.classList.contains('form__btn')) {
      if (e.target.classList.contains('form__btn')) {
        e.preventDefault();
      }
      const modalWindow = modalOverlay.querySelector('.modal');
      modalWindow.classList.remove('active')
      setTimeout(() => {
        modalOverlay.classList.remove('active')
        document.body.classList.remove('no-scroll')
      },300)
    }
  })
}
if (modalOverlay) {
  modalClose(modalOverlay)
  if (modalOverlay.classList.contains('active')) {
    document.body.classList.add('no-scroll');
  } else {
    document.body.classList.remove('no-scroll');
  }

}
if (signInBtn && modalOverlaySignIn) {
  signInBtn.addEventListener('click', (e) => {
    modalOverlaySignIn.classList.add('active');
    const modal = modalOverlaySignIn.querySelector('#modal-sign_in');
    setTimeout(() => {
      modal.classList.add('active')
    }, 300)
    document.body.classList.add('no-scroll')
  })
  modalClose(modalOverlaySignIn)
}
if (signUpBtn && modalOverlaySignUp) {
  signUpBtn.addEventListener('click', (e) => {
    modalOverlaySignUp.classList.add('active');
    const modal = modalOverlaySignUp.querySelector('#modal-sign_up');
    setTimeout(() => {
      modal.classList.add('active')
    }, 300)
    document.body.classList.add('no-scroll')
  })
  modalClose(modalOverlaySignUp)
};
  const isMobile = {
  Android: function() {
      return navigator.userAgent.match(/Android/i);
  },
  BlackBerry: function() {
      return navigator.userAgent.match(/BlackBerry/i);
  },
  iOS: function() {
      return navigator.userAgent.match(/iPhone|iPad|iPod/i);
  },
  Opera: function() {
      return navigator.userAgent.match(/Opera Mini/i);
  },
  Windows: function() {
      return navigator.userAgent.match(/IEMobile/i);
  },
  any: function() {
      return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
  }
};

if (isMobile.any()) {
    document.body.classList.add('isMobile')
} else {
    document.body.classList.remove('isMobile')
};
  //person-slot chart js big-chart

const bigCharts = document.querySelectorAll('.big-chart');
const chartAreaWrapper = document.querySelector('.chartAreaWrapper');

if (bigCharts.length) {
  const urlIcon = chartAreaWrapper.getAttribute('url-icon');
  // Chart.register(ChartDataLabels)
  function minValue(ctx) {
    const dataset = ctx.chart.data.datasets[0];
    const min = dataset.data.reduce((max, point) => Math.min(point, max), Infinity);
    return isFinite(min) ? min : 0;
  }
  function lastValue(ctx) {
    const datasets = ctx.chart.data.datasets;
    // const count = datasets[0].data.length;
    // let max = 0;
    // for (let i = 0; i < count; i++) {
    //   let sum = 0;
    //   for (const dataset of datasets) {
    //     sum += dataset.data[i];
    //   }
    //   max = Math.max(max, sum);
    // }
    return datasets[0].data[datasets[0].data.length - 1] === 0 ? '0' : datasets[0].data[datasets[0].data.length - 1];
  }
  const getOrCreateTooltip = (chart) => {
    let tooltipEl = chart.canvas.parentNode.querySelector('div');

    if (!tooltipEl) {
      tooltipEl = document.createElement('div');
      tooltipEl.style.color = '#1F1F1F';
      tooltipEl.style.opacity = 1;
      tooltipEl.style.fontFamily = 'ProximaNova';
      tooltipEl.style.fontSize = 14 + 'px';
      tooltipEl.style.pointerEvents = 'none';
      tooltipEl.style.transition = 'all .1s ease';
      tooltipEl.style.width = '1444px';
      const table = document.createElement('div');
      table.className = 'graph-values'
      table.style.margin = '0';
      table.style.display = 'flex';
      table.style.justifyContent = 'center';
      table.style.alignItems = 'center';
      table.style.background = '#EEEEEE';
      table.style.width = '180px';
      table.style.borderRadius = '4px';
      table.style.padding = 2 + 'px ' + 8 + 'px';
      table.style.position = 'sticky';
      table.style.left = '50%';
      table.style.transform = 'translateX(-50%)';
      tooltipEl.appendChild(table);
      chart.canvas.parentNode.appendChild(tooltipEl);
    }

    return tooltipEl;
  };

  const externalTooltipHandler = (context) => {
    // Tooltip Element
    const {chart, tooltip} = context;
    const tooltipEl = getOrCreateTooltip(chart);

    // Hide if no tooltip
    if (tooltip.opacity === 0) {
      tooltipEl.style.opacity = 0;
      return;
    }

    // Set Text
    if (tooltip.body) {
      const titleLines = tooltip.title || [];
      const bodyLines = tooltip.body.map(b => b.lines);
      const tableHead = document.createElement('div');
      tableHead.className = 'date'
      tableHead.style.paddingRight = '16px'

      titleLines.forEach(title => {
        const tr = document.createElement('span');
        const text = document.createTextNode(title);
        const dateNumbers = text.textContent.split(' ')
        tr.appendChild(text);
        tableHead.appendChild(tr);
        // if (dateNumbers[0] < 10) {
        //   tr.textContent = '0' + dateNumbers[0]
        // } else {
        //   tr.textContent = dateNumbers[0]
        // }
      });

      const tableBody = document.createElement('div');
      tableBody.className = 'values';
      tableBody.style.borderLeft = '1px solid #E2E2E2'
      tableBody.style.paddingLeft = '16px'
      bodyLines.forEach((body, i) => {

        const image = document.createElement('img');
        image.src = urlIcon;
        image.style.marginTop = '-1px'
        image.style.marginLeft = '5px';
        const tr = document.createElement('span');
        const text = document.createTextNode(body);
        tr.appendChild(text);
        tr.appendChild(image);
        tableBody.appendChild(tr);
      });

      const tableRoot = tooltipEl.querySelector('div.graph-values');

      // Remove old children
      while (tableRoot.firstChild) {
        tableRoot.firstChild.remove();
      }

      // Add new children
      tableRoot.appendChild(tableHead);
      tableRoot.appendChild(tableBody);
    }

    // Display, position, and set styles for font
    tooltipEl.style.opacity = 1;
    tooltipEl.style.position = 'absolute';
    tooltipEl.style.top = 0;

  };
  let data = [];
  if (chartAreaWrapper && chartAreaWrapper.dataset.zero) {
    data = [0, 0,0,0, 0, 0, 0,0,0,0, 0];
  } else {
    data = [50000, 3000,2000,4000, 10000, 3000, 77280,22800,22800,22008, 54000];
  }
  const labels = ['1 апр 21', '15 апр 21', '1 мая 21','1 мая 21','1 мая 21','1 мая 21', '15 мая 21', '1 июня 21', '1 июня 21', '1 июня 21', '1 июня 21']
  function changeWidthChartWrapper () {
    if (chartAreaWrapper) {

      const dataLength = data.length;
      chartAreaWrapper.style.width = dataLength * 100 + 'pt'
    }
  }
  changeWidthChartWrapper()

  bigCharts.forEach(bigChart => {
    const myChart = new Chart(bigChart, {
      type: 'line',
      data:  {
        labels,
        datasets: [{
            label: false,
            data,
            backgroundColor: 'rgba(255, 255, 255, 1)',
            borderColor: 'rgba(0, 0, 0, 1)',
            borderWidth: 2,
            pointBorderWidth: 2,
            pointRadius: 3,
            pointHoverRadius: 6,
            pointHoverBorderWidth: 2.5,
            pointHoverBorderColor: '#fff',
            pointHoverBackgroundColor: '#000',
            tension: 0,
            datalabels: {
              align: 'top',
              anchor: 'start'
            }
        }]
      },
      options: {
        responsive: true,
        aspectRatio: false,
        layout: {
          padding: {
            right: 105
          }
        },
        scales: {
          x: {
              backgroundColor: '#fff',
              // type: 'logarithmic',
              ticks: {
                font:{
                  size: 12
                },
                showLabelBackdrop: true,
                color: '#AFAFAF',
                major: true,
                padding: 10,
                // display: false,
                offset: true
              },
              grid: {
                  display: false,
              }
          },
          y: {
            backgroundColor: "#fff",
            grid: {
                display: false,
            },
          },
        },
        // hover: {
        //   mode: 'index',
        //   intersect: true
        // },
        interaction: {
          mode: 'point',
        },
        plugins: {
          tooltip: {
            enabled: false,
            position: 'nearest',
            external: externalTooltipHandler
          },
          autocolors: false,
          legend: {
            display: false
          },
          annotation: {
            annotations: {
              line1: {
                type: 'line',
                scaleID: 'y',
                id: 1,
                value: lastValue,
                borderColor: '#AFAFAF',
                borderWidth: 1,
                borderDash: [2,4],
                label: {
                  content: lastValue,
                  backgroundColor: '#1F1F1F',
                  enabled: true,
                  borderRadius: 2,
                  // rotation: 'end',
                  xPadding: 16,
                  xAdjust: 105,
                  position: 'end',
                }
              },

            }
          }
        },

      },
      plugins: [
        {
          id: 'tooltipeLine',
          beforeDraw: chart => {
            if (chart.tooltip._active && chart.tooltip._active.length) {
              const ctx = chart.ctx;
              ctx.save();
              const activePoint = chart.tooltip._active[0]
              // console.log(activePoint.element)
              ctx.beginPath();
              ctx.moveTo(activePoint.element.x, chart.chartArea.top - 8)
              ctx.lineTo(activePoint.element.x, activePoint.element.y)
              ctx.lineWidth = 1,
              ctx.strokeStyle = '#E2E2E2'
              ctx.stroke();
              ctx.restore()

              ctx.beginPath();
              ctx.moveTo(activePoint.element.x, activePoint.element.y)
              ctx.lineTo(activePoint.element.x, chart.chartArea.bottom)
              ctx.lineWidth = 1,
              ctx.strokeStyle = '#E2E2E2'
              ctx.stroke();
              ctx.restore()
            }
          }
        },
      ]
    });

  })
// /end person-slot chart js big-chart

}
// person-slot chart js small-chart
const smallCharts = document.querySelectorAll('.small-chart');
const chartAreaWrapperSmall = document.querySelector('.chartAreaWrapper--small');
if (smallCharts.length) {
  // Chart.register(ChartDataLabels)
  function minValue(ctx) {
    const dataset = ctx.chart.data.datasets[0];
    const min = dataset.data.reduce((max, point) => Math.min(point, max), Infinity);
    return isFinite(min) ? min : 0;
  }
  function lastValue(ctx) {
    const datasets = ctx.chart.data.datasets;
    return datasets[0].data[datasets[0].data.length - 1];
  }

  const data = [50000, 3000, 2000, 4000, 10000, 3000, 77280, 22800,22800, 22008, 54000];
  const labels = ['1 апр 21', '15 апр 21', '1 мая 21','1 мая 21','1 мая 21','1 мая 21', '15 мая 21', '1 июня 21', '1 июня 21', '1 июня 21', '1 июня 21']
  function changeWidthChartWrapper () {
    if (chartAreaWrapperSmall) {
      const dataLength = data.length;
      chartAreaWrapperSmall.style.width = dataLength * 27.27 + 'pt'
    }
  }
  changeWidthChartWrapper()

  smallCharts.forEach(smallChart => {
    const myChart = new Chart(smallChart, {
      type: 'line',
      data:  {
        labels,
        datasets: [{
            label: false,
            data,
            backgroundColor: 'rgba(255, 255, 255, 1)',
            borderColor: 'rgba(0, 0, 0, 1)',
            borderWidth: 1,
            pointBorderWidth: 1,
            pointRadius: 1,
            pointHoverRadius: 3,
            pointHoverBorderWidth: 2.5,
            pointHoverBorderColor: '#fff',
            pointHoverBackgroundColor: '#000',
            tension: 0,
            datalabels: {
              align: 'top',
              anchor: 'start'
            }
        }]
      },
      options: {
        responsive: true,
        aspectRatio: false,
        layout: {
          padding: {
            right: 15.43
          }
        },
        scales: {
          x: {
              // backgroundColor: '#fff',
              // type: 'logarithmic',
              ticks: {
                display: false,
                font:{
                  size: 12
                },
                showLabelBackdrop: true,
                color: '#AFAFAF',
                major: true,
                padding: 10,
                // display: false,
                offset: true
              },
              grid: {
                  display: false,
              }
          },
          y: {
            // backgroundColor: "#fff",
            ticks: {
              display: false,
            },
            grid: {
                display: false,
            },
          },
        },
        // hover: {
        //   mode: 'index',
        //   intersect: true
        // },
        interaction: {
          mode: 'point',
        },
        plugins: {
          tooltip: {
            enabled: false,
            position: 'nearest',
          },
          autocolors: false,
          legend: {
            display: false
          },
          annotation: {
            annotations: {
              line1: {
                type: 'line',
                scaleID: 'y',
                id: 1,
                value: lastValue,
                borderColor: '#AFAFAF',
                borderWidth: 1,
                borderDash: [2,4],
              },

            }
          }
        },

      },
      plugins: [
      ]
    });

  })
// /end person-slot chart js big-chart

}

// /end person-slot chart js small-chart;
  const requiredInputs = document.querySelectorAll('input.required');
if (requiredInputs.length) {
  requiredInputs.forEach(input => {
    input.addEventListener('input', (e) => {
      if (e.target.classList.contains('_card')) {
        validCard(e.target)
      }
      else if (e.target.classList.contains('_code')) {
        validCode(e.target)
      }
      else if (e.target.classList.contains('_phone')) {
        validPhone(e.target)
      }
    })
  })

  function validCard(input) {
    const formGroupValid = input.closest('.form__group--valid');
    if (input.value.length < 19) {
      formGroupValid.classList.add('valid-cancel')
      formGroupValid.classList.remove('valid-agreed')
    } else {
      formGroupValid.classList.add('valid-agreed')
      formGroupValid.classList.remove('valid-cancel')
    }
  }
  function validCode(input) {
    const formGroupValid = input.closest('.form__group--valid');
    if (input.value.length < 6) {
      formGroupValid.classList.add('valid-cancel')
      formGroupValid.classList.remove('valid-agreed')
    } else {
      formGroupValid.classList.add('valid-agreed')
      formGroupValid.classList.remove('valid-cancel')
    }
  }
  function validPhone(input) {
    const formGroupValid = input.closest('.form__group--valid');
    if (input.value.length < 18) {
      formGroupValid.classList.add('valid-cancel')
      formGroupValid.classList.remove('valid-agreed')
    } else {
      formGroupValid.classList.add('valid-agreed')
      formGroupValid.classList.remove('valid-cancel')
    }
  }
}
// valid social-links
const regExpSiteUrl= /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/;
const socialLinksInputs = document.querySelectorAll('.form__control--needed-valid');
if (socialLinksInputs.length) {
  socialLinksInputs.forEach(input => {
    input.addEventListener('input', (e) => {
      validInputSocialLinks(e.target)
    })
  })

  function validInputSocialLinks(input) {
    const formGroupNeededValid = input.closest('.form__group--needed-valid');
    if (regExpSiteUrl.test(input.value)) {
      formGroupNeededValid.classList.add('valid-agreed');
      formGroupNeededValid.classList.remove('valid-cancel');
    } else if(!regExpSiteUrl.test(input.value)) {
      formGroupNeededValid.classList.remove('valid-agreed');
      formGroupNeededValid.classList.add('valid-cancel');
    }

  }
}

// /end valid social-links;
  const userShowBtn = document.querySelector('[btn-user-show]');
const bodyuserMobile = document.querySelector('.header-auth__user-wrap-main');
const mobileAccountsItem = document.querySelector('.mobile-accounts');
const mobileAccountsoverlay = document.querySelector('.mobile-accounts__overlay');
const mobileAccountsClose = document.querySelector('.mobile-accounts__close');
if (userShowBtn) {

  mobileUserAdd()
  mobileUserRemove()

 function mobileUserAdd() {
  userShowBtn.addEventListener('click', (e) => {
    if (e.currentTarget.classList.contains('more-accounts') && document.documentElement.clientWidth < 575) {
      document.body.classList.add('no-scroll')
      mobileAccountsoverlay.classList.add('show')
      setTimeout(() => {
        mobileAccountsItem.classList.add('active')
      }, 200)
    }
    else {
      bodyuserMobile.classList.toggle('active')
    }
  })
 }
 function mobileUserRemove() {
  if (mobileAccountsoverlay && document.documentElement.clientWidth < 575) {
    mobileAccountsoverlay.addEventListener('click',(e) => {
      mobileAccountsItem.classList.remove('active')
      setTimeout(() => {
         mobileAccountsoverlay.classList.remove('show')
      }, 200)
      document.body.classList.remove('no-scroll')
    })
    mobileAccountsClose.addEventListener('click', (e) => {
      mobileAccountsItem.classList.remove('active')
      setTimeout(() => {
         mobileAccountsoverlay.classList.remove('show')
      }, 200)
      document.body.classList.remove('no-scroll')
    })
  }
 }
//  window.addEventListener('resize', () => {
//   mobileUserAdd()
//   mobileUserRemove()
//  })
};
  const sidebarTitleBtns = document.querySelectorAll('.sidebar--accordion .sidebar__title:not(.sidebar__title--inside)');
const sidebarTitleINsideBtn = document.querySelectorAll('.sidebar__title--inside');
if (sidebarTitleBtns.length) {
  sidebarTitleBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault()
      const bodyBlock = e.currentTarget.closest('.sidebar__list-item').querySelector('.sidebar__body-block');
      if (bodyBlock) {
        openBodyHeight(bodyBlock, e.currentTarget)
      }
    })
  })

  sidebarTitleINsideBtn.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault()
      const parentBlock = e.currentTarget.closest('.collapsible-accordion');
      if (parentBlock) {
        const bodyBlock =  parentBlock.querySelector('.collapsible-accordion__body');
        openBodyHeight(bodyBlock, e.currentTarget)
      }
    })
  })

  function animationHeight(bodyContent, button, isVisible = false) {
    if (bodyContent.style.maxHeight) {
      if (isVisible && bodyContent.classList.contains('visible')) {
        bodyContent.style.overflow = 'hidden'
      }
      bodyContent.style.maxHeight = null
      button.classList.remove('opened')
    } else {
      if (isVisible && bodyContent.classList.contains('visible')) {
        setTimeout(() => {
          bodyContent.style.overflow = 'visible'
        }, 100)
      }
      bodyContent.style.maxHeight = bodyContent.scrollHeight + "px";
      button.classList.add('opened')
    }
  }
  function openBodyHeight(bodyContent, button, isVisible = false) {
    if (bodyContent.style.maxHeight) {
      if (isVisible && bodyContent.classList.contains('visible')) {
        bodyContent.style.overflow = 'hidden'
      }
      bodyContent.style.maxHeight = null
      button.classList.remove('opened')
    } else {
      if (isVisible && bodyContent.classList.contains('visible')) {
        bodyContent.style.overflow = 'visible'
      }
      bodyContent.style.maxHeight = '100%';
      button.classList.add('opened')
    }
  }
// btn-text
  // const btnText = document.querySelector('.btn--text');
  // const hiddenBody = document.querySelector('.hidden-body');
  // if (btnText) {
  //   btnText.addEventListener('click', (e) => {
  //     animationHeight(hiddenBody, btnText)
  //   })

  // }
};

  // selects-slots
  const parentOfSelects = document.querySelector('.slots-choice');
  const selectsHeaders = document.querySelectorAll('.select__header:not(.disabled)');
  const selectsItems = document.querySelectorAll('.select__item');
  const selects = document.querySelectorAll('.select:not(.disabled)');
  if (selectsHeaders.length) {
    for (let i = 0; i < selectsHeaders.length; i++) {
      selectsHeaders[i].addEventListener('click', selectToggle)
    }
    for (let i = 0; i < selectsItems.length; i++) {
      selectsItems[i].addEventListener('click',selectChoose)
    }
    function selectToggle() {
      removeClassActive(this.closest('.select').dataset.select);
      this.closest('.select').classList.toggle('active')
      toggleHeight();
    }
    function selectChoose() {
      const text = this.textContent;
      const dataValue = this.dataset.value;
      const parent = this.closest('.select');
      const current = parent.querySelector('.select__current');
      current.textContent = text;
      current.dataset.current = dataValue;
      parent.classList.remove('active')
      toggleHeight();
    }
  }
  function toggleHeight() {
    if (window.innerWidth <= 425 && document.querySelectorAll('.select').length) {
      if (document.querySelector('.select.active')) {
        parentOfSelects.style.height = parentOfSelects.scrollHeight + 10 + 'px';
      } else {
        parentOfSelects.style.height = 50 + 'px';
      }
    }
  }
  function removeClassActive(number) {
    for (let i = 0; i < selects.length; i++) {
      if (+number !== +(selects[i].dataset.select)) {
        selects[i].classList.remove('active')
      }
    }
  }
  // /end selects-slots

  // radio-view-slots

  const radioButtons = document.querySelectorAll('[js-radio]');
  const mobileRadioButtons = document.querySelectorAll('[js-mobile-radio]');
  const desktopRadioButtons = document.querySelectorAll('[js-desktop-radio]');
  const slotsList = document.querySelector('.slots__list:not(.rating__list)');

  if (radioButtons.length && slotsList) {
    function toggleCheckedMobile() {
      for (let i = 0; i < desktopRadioButtons.length; i++) {
        if (desktopRadioButtons[i].checked) {
          mobileRadioButtons[i].checked = true;
        }

      }
    }
    function toggleCheckedDesktop() {
      for (let i = 0; i < mobileRadioButtons.length; i++) {
        if (mobileRadioButtons[i].checked) {
          desktopRadioButtons[i].checked = true;
        }
      }
    }
    function toggleView(view) {
      if (view === 'list') {
        slotsList.classList.remove('blocks')
      } else {
        slotsList.classList.add('blocks')
      }
    }
    radioButtons.forEach(radio => {
      radio.addEventListener('click', (e) => {
        if (e.target.hasAttribute('js-desktop-radio')) {
          toggleCheckedMobile()
          toggleView(e.target.dataset.view)
        } else {
          toggleCheckedDesktop()
          toggleView(e.target.dataset.view)
        }
      })
    })
  }
  // /end radio-view-slots

  // amount-input and valid-inputs
  const amountInputs = document.querySelectorAll('[js-amount-input]');
  const validInputs = document.querySelectorAll('[js-valid-input]')
  function replaceWords(inputs, btn = false) {
    if (inputs.length) {
      inputs.forEach(input => {
        input.addEventListener('input', (e) => {
          e.target.value = e.target.value.replace(/\D/g, '');
          const formBtn =  e.target.closest('.form').querySelector('.form__btn');
          if (btn) {
            if (e.target.value.length > 0 && +(e.target.value[0]) !== 0) {
              formBtn.removeAttribute('disabled');
            } else {
              formBtn.setAttribute('disabled', true);
            }
          }
          if (e.target.hasAttribute('data-percent')) {
            const dataPriceItem = e.target.closest('form.form').querySelector('[data-price]');
            let valueOfTips = +(e.target.value);
            const percentValue = +(e.target.dataset.percent);
            const currentPrice = +(e.target.getAttribute('data-current-price'));
            let priceForTips = valueOfTips * currentPrice;
            let priceWithDiscount = (priceForTips - ((priceForTips * percentValue) / 100)).toFixed(0);
            dataPriceItem.value = priceWithDiscount
          }
        })
      })
    }
  }
  replaceWords(amountInputs, true)
  replaceWords(validInputs)
  // /end amount-input and valid-inputs

  //input-password
  const inputPasswordButtons = document.querySelectorAll('[js-btn-password]');
  if (inputPasswordButtons.length) {
    inputPasswordButtons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault()
        const inputPass = e.currentTarget.closest('.form__group--password').querySelector('.form__control--pass');
        if (e.currentTarget.classList.contains('show')) {
          e.currentTarget.classList.remove('show');
          inputPass.setAttribute('type', 'password')
        } else {
          e.currentTarget.classList.add('show');
          inputPass.setAttribute('type', 'text')
        }

      })
    })
  }
  // /end input-pwassword

  // card-choice-active
  const cards =document.querySelectorAll('[js-card-choice]');

  if (cards.length) {
    cards.forEach(card => {
      card.addEventListener('click', (e) => {
        const activeCard = e.currentTarget.closest('div.swiper-wrapper').querySelector('button.cards__item.active');
        activeCard.classList.remove('active');
        e.currentTarget.classList.add('active')
      })
    })
  }
  // /end card-choice-active

  //js-credit-card-valid
  const creditCardInputs = document.querySelectorAll('[js-credit-card]');
  if (creditCardInputs.length) {
    let ccNumberPattern = /^\d{0,16}$/g,
      ccNumberSeparator = " ",
      ccNumberInputOldValue,
      ccNumberInputOldCursor,
      mask = (value, limit, separator) => {
        var output = [];
        for (let i = 0; i < value.length; i++) {
          if ( i !== 0 && i % limit === 0) {
            output.push(separator);
          }

          output.push(value[i]);
        }

        return output.join("");
      },
      unmask = (value) => value.replace(/[^\d]/g, ''),
      checkSeparator = (position, interval) => Math.floor(position / (interval + 1)),
      ccNumberInputKeyDownHandler = (e) => {
        let el = e.target;
        ccNumberInputOldValue = el.value;
        ccNumberInputOldCursor = el.selectionEnd;
      },
      highlightCC = (ccValue) => {
        let ccCardType = '',
            ccCardTypePatterns = {
              amex: /^3/,
              visa: /^4/,
              mastercard: /^5/,
              disc: /^6/,

              genric: /(^1|^2|^7|^8|^9|^0)/,
            };

        for (const cardType in ccCardTypePatterns) {
          if ( ccCardTypePatterns[cardType].test(ccValue) ) {
            ccCardType = cardType;
            break;
          }
        }

        let activeCC = document.querySelector('.cc-types__img--active'),
            newActiveCC = document.querySelector(`.cc-types__img--${ccCardType}`);

        if (activeCC) activeCC.classList.remove('cc-types__img--active');
        if (newActiveCC) newActiveCC.classList.add('cc-types__img--active');
      },
      ccNumberInputInputHandler = (e) => {
        let el = e.target,
            newValue = unmask(el.value),
            newCursorPosition;

        if ( newValue.match(ccNumberPattern) ) {
          newValue = mask(newValue, 4, ccNumberSeparator);

          newCursorPosition =
            ccNumberInputOldCursor - checkSeparator(ccNumberInputOldCursor, 4) +
            checkSeparator(ccNumberInputOldCursor + (newValue.length - ccNumberInputOldValue.length), 4) +
            (unmask(newValue).length - unmask(ccNumberInputOldValue).length);

          el.value = (newValue !== "") ? newValue : "";
        } else {
          el.value = ccNumberInputOldValue;
          newCursorPosition = ccNumberInputOldCursor;
        }

        el.setSelectionRange(newCursorPosition, newCursorPosition);

        highlightCC(el.value);
      }
      creditCardInputs.forEach(input => {
        input.addEventListener('keydown', ccNumberInputKeyDownHandler);
        input.addEventListener('input', ccNumberInputInputHandler);
      })
  }

 // /end js-credit-card-valid

  // js-more-btn
  const allMoreBodies= document.querySelectorAll('.more-body');
  if (allMoreBodies.length) {
    for (let i = 0; i < allMoreBodies.length; i++) {
      allMoreBodies[i].setAttribute('data-number', i);
    }
  }
  // /end js-more-btn

  // mask init
  const inputsMask = document.querySelectorAll('.masked');
  if (inputsMask.length) {
    inputsMask.forEach(item => {
      Maska.create(item);
    })
  }
  // /end mask-init

  // radio-form-items
  const radioFormItems = document.querySelectorAll('[js-form-card]');
  const radioPaymentItems = document.querySelectorAll('[js-radio-payment]');
  if (radioFormItems.length) {
    radioFormItems.forEach(item => {
      item.addEventListener('click', (e) => {
        for (let i = 0; i < radioFormItems.length; i++) {
          radioFormItems[i].classList.remove('active')
          radioPaymentItems[i].checked = false
        }
        e.currentTarget.classList.add('active');
        e.currentTarget.querySelector('[js-radio-payment]').checked = true;
        e.currentTarget.closest('.form').querySelector('.form__btn').removeAttribute('disabled')
      })
    })
  }
  // /end radio-form-items


  // close-fixed-header-login
  const closeHeaderFixedBtn = document.querySelector('.sign-in-fixed__close');
  if (closeHeaderFixedBtn) {
    closeHeaderFixedBtn.addEventListener('click', (e) => {
      e.target.closest('.sign-in-fixed').classList.remove('active')
    })
  }
  // /end close-fixed-header-login
    // body click
  document.body.addEventListener('click', (e) => {
    // select
    const select = e.target.closest('.select');
    if (!select) {
      removeClassActive()
      toggleHeight()
    }
    // /end select

    // js-more-btn
    if (allMoreBodies.length) {
      const moreBtn = e.target.closest('[js-btn-more]:not(.loading)');
      function hideMoreBody(number) {
        for (let i = 0; i < allMoreBodies.length; i++) {
          if (number !== allMoreBodies[i].dataset.number) {
            allMoreBodies[i].classList.remove('active')
          }
        }
      }
      if (moreBtn) {
        const bodyMoreBtn = moreBtn.querySelector('.more-body');
        console.log(e.target)
        hideMoreBody(bodyMoreBtn.dataset.number);
        bodyMoreBtn.classList.toggle('active');
      }
      if (!moreBtn) {
        hideMoreBody()
      }
    }
    // /end js-more-btn

    // show-login-side-moblie
    if (document.querySelector('.header-auth__user-wrap-main.active') && !(e.target.closest('.header-auth'))) {
      document.querySelector('.header-auth__user-wrap-main.active').classList.remove('active')
    }
    // // /end show-login-side-moblie
  });
});


