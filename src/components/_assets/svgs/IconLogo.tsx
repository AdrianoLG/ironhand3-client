import switchColor from '../../../utils/switchColor'

const IconLogo = ({ color }: { color: string }) => {
  color = switchColor(color)

  return (
    <svg
      className='max-w-24 sm:max-w-36'
      viewBox='0 0 142 157'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <title>Iron Hand logo</title>
      <path
        d='M57.3846 46.2041C54.8324 49.299 52.4017 52.3938 49.7279 55.6125C53.0093 61.307 56.0477 66.5064 59.0861 71.7057C61.5168 75.9148 64.7983 78.3906 69.7812 78.5144L69.6597 78.3906C65.7706 80.4951 63.5829 80.3714 59.9369 76.4099C53.9816 69.9726 48.9987 62.7926 46.6895 54.0032C46.5679 53.3842 46.4464 52.7652 46.2033 51.8987C36.7236 48.4324 27.0007 44.8424 21.4101 35.1864C19.344 38.5289 17.1563 42.2427 14.6041 46.2041C20.3163 43.852 24.8131 46.0803 29.1884 49.4228C30.8426 50.9308 32.7883 52.0693 34.9005 52.7652C42.6788 54.7459 47.0541 60.3167 50.214 67.2492L50.3355 67.1254C49.3633 70.4678 49.8494 74.1816 46.811 76.9051C44.1372 79.381 41.9496 82.3521 37.3312 80.8665C43.0434 89.0369 45.9603 90.3987 52.8878 88.2942C56.0477 87.3038 58.9646 85.8183 58.2354 81.4855V81.6093C61.5168 83.9614 59.9369 86.1897 57.8708 88.1704C54.2247 91.6366 47.1756 92.5032 42.4357 89.7797C39.1427 87.79 36.0843 85.4225 33.3206 82.7234C30.7683 80.2476 28.2161 78.5144 24.3269 78.6382C21.167 78.762 18.0071 77.8955 14.7256 77.4003C13.8749 76.9051 13.0241 76.5337 12.1734 76.0386C11.904 75.9177 11.6573 75.7502 11.4442 75.5434C11.6872 75.6672 12.0518 75.6672 12.2949 75.791C13.1457 76.2861 13.9964 76.6575 14.8472 77.1527C18.2502 78.5144 21.6532 79.8762 23.9623 80.8665C21.167 83.8376 18.0071 87.18 14.7256 90.6463L15.6979 91.6366C18.9794 89.4083 22.2608 87.0562 25.6638 85.1993C28.0945 83.8376 30.2822 83.8376 32.7129 86.1897C35.5082 89.0369 39.0327 91.1415 42.3142 93.6173C41.7065 95.7218 40.9773 97.7026 40.3696 99.8071C40.2481 99.9308 40.005 100.055 39.8835 100.178C40.005 100.055 40.1266 99.807 40.2481 99.6833C43.2139 96.6545 46.9662 94.5503 51.0648 93.6173C54.5893 92.7508 57.6277 90.0273 60.9091 88.0466C63.7045 86.3135 66.1352 83.4662 70.7535 85.1993C70.7535 87.9228 70.5104 90.7701 70.7535 93.4935C71.3612 99.4357 71.2397 105.625 75.858 110.453C75.858 110.949 75.7365 111.444 75.858 111.072V110.577C73.2543 102.767 72.7507 94.389 74.3996 86.3135C75.4934 80.3714 78.6533 77.5241 84.487 77.2765C86.6747 77.1527 88.8623 76.9051 91.05 76.6575C93.2376 76.4099 95.4252 76.0386 97.6129 75.791C99.5574 78.1431 101.502 80.3714 103.325 82.5996C103.933 82.8472 104.419 83.0948 105.027 83.3424C105.396 83.8925 105.721 84.4721 105.999 85.0755L106.242 85.3231L105.999 85.5707L105.756 85.3231C105.391 84.7041 105.148 84.209 104.783 83.59C104.297 83.3424 103.811 82.971 103.325 82.7234C103.09 81.5416 102.968 80.3393 102.96 79.1334C102.96 77.4003 103.325 75.791 103.447 74.0578C105.027 74.4292 106.728 74.6768 108.186 75.172C110.617 75.9148 113.048 76.9051 115.479 77.7717C116.102 78.1509 116.752 78.4819 117.423 78.762C117.545 78.5144 117.545 78.2668 117.666 78.0193C116.937 78.0193 116.086 77.8955 115.357 77.8955C114.02 76.5337 112.562 75.172 111.225 73.8103C109.159 71.7058 108.551 69.3537 110.617 66.754C110.739 66.6302 110.86 66.6302 110.982 66.5064V66.2588C110.86 66.5064 110.86 66.754 110.739 67.0016C105.634 68.8585 100.651 70.8392 95.4252 72.3247C88.9838 74.3054 82.5425 73.4389 76.3441 71.2106C70.632 69.1061 69.052 63.9067 72.455 58.7074C73.8391 56.6786 75.5677 54.9178 77.5595 53.508C83.6363 49.5466 89.8346 45.709 96.1544 41.9951C97.371 41.2688 98.755 40.8844 100.165 40.881C106.85 40.5096 113.534 40.1382 120.097 40.0144C121.453 40.126 122.735 40.6919 123.743 41.6237C128.24 45.709 132.737 49.918 137.112 54.127C141.609 58.4598 142.824 63.9067 141.487 69.9726C140.899 72.1414 140.126 74.2539 139.178 76.2861C136.504 83.0948 133.587 89.9035 130.914 96.7122C127.632 105.006 121.92 111.32 115.114 116.767C113.957 117.534 113.065 118.651 112.564 119.961C112.062 121.271 111.977 122.708 112.319 124.071C113.306 129.505 113.875 135.01 114.02 140.535C114.02 145.735 112.926 151.058 112.076 156.257C109.402 145.116 114.142 133.231 108.916 121.966C102.717 126.794 96.1545 130.137 88.6193 131.251C87.5254 131.375 86.4316 132.736 85.5809 133.727C84.244 135.212 83.0286 136.945 81.6917 138.678C81.6917 143.63 81.8133 148.706 81.6917 153.905C81.5702 156.876 81.4486 156.876 76.9518 156.257C77.438 151.305 77.9241 146.23 78.4103 140.783C75.4934 141.278 72.8196 141.897 70.1458 142.392C76.5872 146.106 72.455 151.677 73.1842 157H43.5296C44.8664 148.706 51.4294 146.106 57.8708 142.392C49.8494 141.031 41.9496 141.402 35.6297 135.707C32.4698 143.259 36.9666 149.82 36.9666 156.876C34.4144 151.924 30.5252 147.468 31.376 141.402C32.2267 134.965 30.7683 129.641 25.4208 125.804C24.8131 125.309 24.4485 124.442 23.7193 123.947C14.6041 116.767 11.0796 106.863 9.86421 95.598C9.18691 90.9707 7.74886 86.4926 5.61046 82.3521C1.69641 73.9269 -0.218631 64.6826 0.0198303 55.3649C-0.0486055 53.8226 0.300675 52.2909 1.02947 50.9372C1.75827 49.5835 2.83851 48.46 4.15204 47.6897C6.21814 46.4517 8.04118 44.7186 10.2288 43.6045C11.8045 42.8876 13.2079 41.8296 14.3413 40.5041C15.4747 39.1786 16.3109 37.6174 16.7917 35.9292C18.6148 29.7395 22.9901 26.397 28.5807 24.7877C30.2482 24.3597 31.796 23.5448 33.1032 22.4067C34.4103 21.2685 35.4414 19.8379 36.1159 18.2266C38.182 13.6462 41.8281 11.4179 46.5679 10.9228C53.6034 10.2685 60.3691 7.84379 66.2567 3.86649C72.8196 -0.342512 79.8687 -1.58045 87.5254 2.50476C94.8176 6.46617 102.596 9.56103 110.009 13.0273C110.946 13.5756 111.84 14.1964 112.683 14.8842C108.186 17.3601 100.773 13.6462 99.5574 21.3215C105.391 19.836 110.982 18.3504 117.059 16.8649V31.3488H115.843C115.965 28.1302 116.208 24.7877 116.329 21.4453C114.744 20.524 112.959 20.0191 111.134 19.9758C109.309 19.9326 107.503 20.3525 105.877 21.1977C101.988 23.0546 99.5574 25.2829 100.287 30.1109C100.379 32.1332 99.8248 34.1316 98.7067 35.8054C94.2099 30.8536 95.4252 25.1591 95.7898 19.4646C95.9612 19.4831 96.1334 19.4392 96.276 19.3408V18.9694C96.1545 19.0932 96.0329 19.3408 95.9114 19.4646C87.2824 18.7218 80.4764 13.77 73.3058 9.56103C72.0904 8.81827 72.212 5.8472 71.6043 3.7427C67.8367 6.09479 63.7045 8.57067 59.6938 11.0466C71.8473 10.0562 80.9625 16.9887 90.5638 22.9308C84.522 22.7171 78.5679 24.4499 73.5488 27.8826C70.5105 29.8633 69.6597 32.0916 72.9412 34.5675L72.8196 34.3199C73.4273 37.9099 74.035 41.4999 74.5211 45.2138C74.7642 46.8231 74.6427 48.4324 74.7642 51.1559C69.9028 45.8328 67.8367 39.2717 67.5936 30.7299C60.6661 29.3681 53.8601 28.254 47.1756 26.6446C41.4634 25.2829 41.585 25.0353 40.005 17.979C38.6681 21.3215 37.6959 23.6736 36.359 26.8922C42.6788 28.6253 48.634 30.2347 54.7108 31.844C56.6554 32.3392 58.7215 32.463 60.6661 32.9582C67.229 34.6913 68.809 38.7765 64.9198 44.3472C62.6013 47.8519 59.2339 50.5005 55.3185 51.8987C55.9262 49.5466 56.2908 47.8135 56.6554 46.2041C57.1307 45.826 57.5776 45.4122 57.9923 44.9662L59.0861 43.4807C60.1488 43.3856 61.2044 43.2202 62.246 42.9855L62.1245 43.1093C61.1522 42.9855 60.3015 42.7379 59.3292 42.6141C61.0307 41.1286 62.8537 39.7668 65.0414 37.9099C58.2354 38.9003 53.1309 41.6237 49.2417 46.6993C48.634 47.5659 49.1202 49.299 49.1202 50.4131C52.8878 47.4421 56.1693 44.9662 59.4507 42.4903C59.3292 42.8617 59.2076 43.3569 59.0861 43.7282L57.9923 45.2138C58.2354 45.4614 57.7492 45.8328 57.3846 46.2041ZM40.4912 63.6591C40.5111 63.2426 40.4701 62.8254 40.3696 62.4212C40.8558 61.4308 41.4635 60.4405 41.9496 59.3263C38.4755 61.55 35.3939 64.354 32.8344 67.6205C32.2268 68.3633 32.956 70.2202 33.199 71.9533C35.1436 69.1061 36.602 66.8778 38.0605 64.7733C38.0605 65.6398 38.182 66.6302 38.182 67.4967L35.2651 72.3247C35.7513 72.5723 36.2374 72.6961 36.7236 72.9437C37.2097 71.0868 37.6958 69.2299 38.0605 67.373L39.1543 64.7733C39.629 64.4397 40.0761 64.067 40.4912 63.6591ZM116.208 54.7459L115.843 54.8697H116.329C116.208 57.098 116.208 59.3263 116.086 61.5546C115.6 61.4308 115.114 61.307 114.749 61.1832C113.534 59.4501 112.319 57.717 110.982 55.8601C108.43 57.098 106.485 58.2122 104.419 59.0787C102.353 59.9453 100.287 60.6881 98.2206 61.4308C97.5986 63.6957 96.3294 65.7209 94.5745 67.2492C92.6571 68.5563 90.6224 69.6755 88.4977 70.5916C97.9749 69.9097 107.091 66.6147 114.871 61.0594C114.02 63.9067 113.169 66.8778 112.319 70.0964C115.483 73.4108 119.622 75.5839 124.108 76.2861C130.549 77.5241 130.671 77.5241 130.671 84.0852V86.5611C135.046 77.8955 142.46 70.0964 137.598 59.0787C130.427 63.7829 123.257 63.9067 115.843 61.307C118.274 59.2025 116.937 56.9742 116.208 54.7459ZM82.9071 57.717L82.7855 57.2218L83.0286 57.5932C83.8794 59.8215 84.8517 61.926 85.9455 64.6495C82.2994 65.6398 79.0179 66.5064 75.7365 67.373C81.8132 70.7154 87.4039 69.6012 93.9668 64.1543C91.1715 62.4212 88.2546 60.6881 85.3378 58.8311C86.7962 55.8601 84.6086 54.2508 82.664 52.3938C83.1502 54.127 83.7578 55.8601 84.244 57.5932C83.8794 57.5932 83.3932 57.717 82.9071 57.717ZM31.0114 111.815H30.7683L31.1329 111.691C32.7317 114.627 34.476 117.478 36.359 120.233C38.5383 122.792 40.8508 125.23 43.2865 127.537C40.8558 129.146 39.2758 130.26 36.359 132.117C41.3419 133.974 45.3526 135.831 49.4848 136.945C53.9816 138.183 58.7215 138.431 63.2183 139.421C72.5766 141.526 78.2887 135.831 84.8516 130.137C77.6832 123.797 72.5934 115.372 70.2674 105.997C69.7812 106.121 69.4166 106.244 68.9305 106.368C70.1458 112.31 71.4827 118.129 72.8196 124.442C68.5659 126.67 64.3121 126.175 60.0584 124.69C58.3569 124.071 56.4123 122.709 54.9539 123.204C50.9432 124.442 47.7833 122.585 44.7449 120.852C40.005 118.129 35.5082 114.91 31.0114 111.815ZM126.781 95.9694C124.108 98.0739 121.434 100.302 118.639 102.283C110.496 107.977 102.717 114.167 92.3868 115.529C88.6192 116.024 86.067 115.405 84.3655 111.939C82.0563 107.482 79.8687 102.902 77.1949 97.3312C78.0457 109.463 81.2056 119.49 88.9839 128.404C92.9945 127.042 97.1267 126.051 100.773 124.195C108.551 120.481 113.899 113.548 120.218 107.977C123.5 105.006 126.538 101.416 126.781 95.9694ZM3.90896 56.8504C4.15204 63.6591 4.75972 68.8585 11.4442 70.963C17.0348 72.6961 22.3824 75.0482 27.973 77.1527C28.2161 73.0675 28.4592 69.8488 28.5807 67.0016C19.7086 66.0112 10.8365 65.6398 3.90896 56.8504ZM16.5487 102.407C16.7917 116.024 25.7854 121.471 33.6852 127.908C34.9005 127.166 35.9944 126.547 37.9389 125.309C27.973 120.357 20.6809 113.672 16.5487 102.407ZM100.53 42.4903L99.1928 43.852C102.231 47.8135 102.717 54.7459 111.711 53.508C107.579 49.299 104.054 45.8328 100.53 42.4903Z'
        fill={color}
      />
    </svg>
  )
}

export default IconLogo
