import Link from 'next/link'
import styles from '../styles/Home.module.css'
import { useState, useEffect } from 'react'

export async function getStaticProps() {
  return {
    props: {
      message: "This is a static page — and a prop",
    },
  };
}

export default function Marketing({message, promotion}) {
  const [allPromotions, setAllPromotions] = useState(null);

  useEffect(() => {
    setAllPromotions(promotion);
  }, [promotion]);
  
  return (
    <div className={styles.container}>
      <h1>Marketing Page</h1>
      <p id="message">{message}</p>
      <div>
        {allPromotions ? (
          <div className={styles.wrap}>
            { promotion.map((promo) => (
              <div key={promo.ref.id} className={styles.item}>
                <h2>{promo.data.title}</h2>
                <img className={styles.img} src={promo.data.img} />
              </div>
            ))}
          </div>
        ) : <p>No promo for me</p>}
      </div>
      <div className={styles.btnWrap}>
        <Link href="/"><a className={styles.link}>Home</a></Link>
      </div>
    </div>
  )
}