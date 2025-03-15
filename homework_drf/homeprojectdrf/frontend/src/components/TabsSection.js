import Button from "./Button/Button";

export default function TabsSection({active, onChange}){
    return(
        <section style={{marginBottom: '1rem'}}>
            <Button isActive={active === 'main'} onClick={() => onChange('main')}>Каталог</Button>
            <Button isActive={active === 'feedback'} onClick={() => onChange('feedback')}>Обратная связь</Button>
            {/*<Button isActive={active === 'grosver'} onClick={() => onChange('grosver')}>Grosver</Button>*/}
        </section>
    )
}
