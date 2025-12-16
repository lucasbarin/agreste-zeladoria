interface WhatsAppButtonProps {
  phone: string;
  message: string;
  className?: string;
}

export default function WhatsAppButton({ phone, message, className = '' }: WhatsAppButtonProps) {
  const handleClick = () => {
    // Remove caracteres não numéricos
    const cleanPhone = phone.replace(/\D/g, '');
    
    // Adiciona código do Brasil se necessário
    const fullPhone = cleanPhone.startsWith('55') ? cleanPhone : `55${cleanPhone}`;
    
    // Codifica a mensagem para URL
    const encodedMessage = encodeURIComponent(message);
    
    // Abre WhatsApp
    const url = `https://wa.me/${fullPhone}?text=${encodedMessage}`;
    window.open(url, '_blank');
  };

  return (
    <button
      type="button"
      className={`btn btn-sm btn-success ${className}`}
      onClick={handleClick}
      title="Enviar WhatsApp"
    >
      <i className="ph-duotone ph-whatsapp-logo"></i>
    </button>
  );
}
