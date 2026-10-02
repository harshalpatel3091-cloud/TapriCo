export default function Awning({ id, flip }: { id?: string; flip?: boolean }) {
  return (
    <div className={`awning ${flip ? 'flip' : ''}`} id={id}>
      <div className="stripes"></div>
      <div className="scallops"></div>
    </div>
  );
}