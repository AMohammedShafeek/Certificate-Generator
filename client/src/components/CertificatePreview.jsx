import logo from '../assets/logo/logo.png';

export default function CertificatePreview({ student, scale }) {
  if (!student) return null;

  return (
    <div className='flex justify-center items-start min-h-screen bg-gray-300 overflow-auto'>
      {/* SCALE WRAPPER */}
      <div
        style={{
          transform: `scale(${scale})`,
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
              absolute top-[1230px] right-[340px] text-end
              text-[150px]
              bg-gradient-to-r from-[#e76124] to-[#aa1f23]
              bg-clip-text text-transparent
            '
            style={{ fontFamily: 'courgette' }}
          >
            {student.name}
          </div>
          {/* STUDENT NAME */}
          <div
            className='absolute w-[60%] top-[1425px] right-[340px] text-end text-[65px]'
            style={{ fontFamily: 'OpenSans', fontWeight: 400 }}
          >
            <p>
              for winning the <b>Al-Quran Memorization Competition</b>,<br />
              <span>
                <b> {student.category} Suras</b>
              </span>
              - Category, securing
              <span>
                <b> {student.position} </b>
              </span>
              Place. Prize held on
              <span>
                <br />
                <b> {student.date} </b>
              </span>
              by <b>Rabbi-Zidni-Ilman Online Madarasa</b>.
            </p>
          </div>
          {/* DATE */}
          <div
            className='absolute bottom-[520px] left-[1720px] text-start text-[60px]'
            style={{ fontFamily: 'OpenSans', fontWeight: 600 }}
          >
            {student.date}
          </div>
        </div>
      </div>
    </div>
  );
}
