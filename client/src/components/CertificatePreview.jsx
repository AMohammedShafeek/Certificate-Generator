import logo from '../assets/logo/logo.png';

export default function CertificatePreview() {
  return (
    <div className='flex justify-center items-start min-h-screen bg-gray-300 overflow-auto'>
      {/* SCALE WRAPPER */}
      <div
        style={{
          transform: 'scale(0.25)',
          transformOrigin: 'top center',
        }}
      >
        {/* CERTIFICATE CANVAS */}
        <div
          className='relative bg-no-repeat bg-contain'
          style={{
            width: '3579px',
            height: '2551px',
            backgroundImage: "url('/Certificate_BG.png')",
          }}
        >
          {/* LOGO */}
          <div className='relative'>
            <img
              src={logo}
              alt='Logo'
              className='absolute w-[500px] top-[450px] right-[290px] w-[200px]'
            />
          </div>
          {/* STUDENT NAME */}
          <div
            className='
              absolute top-[1240px] right-[340px] text-end
              text-[150px]
              bg-gradient-to-r from-[#e76124] to-[#aa1f23]
              bg-clip-text text-transparent
            '
            style={{ fontFamily: 'courgette' }}
          >
            Mohammed Aslam. A
          </div>
          {/* STUDENT NAME */}
          <div
            className='absolute w-[60%] top-[1425px] right-[340px] text-end text-[65px]'
            style={{ fontFamily: 'OpenSans', fontWeight: 400 }}
          >
            <p>
              for winning the <b>AL-QURAN Memorization Competition</b>,<br />
              <span>
                <b>30 Suras</b>
              </span>
              - Category, securing
              <span>
                <b> POSITION </b>
              </span>
              Place. Prize held on
              <span><br />
                <b> 15 JAN 2026 </b>
              </span>
              by <b>RABBI-ZIDNI-ILMAN Online Madarasa</b>.
            </p>
          </div>
          {/* DATE */}
          <div
            className='absolute bottom-[520px] left-[1720px] text-start text-[60px]'
            style={{ fontFamily: 'OpenSans', fontWeight: 600 }}
          >
            15 JAN 2026
          </div>
        </div>
      </div>
    </div>
  );
}
