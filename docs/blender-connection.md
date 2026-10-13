# Połączenie Codex z Blenderem

Stan lokalnej instalacji sprawdzony 8 października 2026. Integracja korzysta z
[MCP for Blender](https://github.com/ahujasid/mcp-for-blender), społecznościowego
projektu niezależnego od Blender Foundation.

| Element | Wersja / ścieżka na tym Macu |
| --- | --- |
| Blender | 5.2.2, `/Applications/Blender.app` |
| Kod serwera MCP | 2.1.9, `/Users/dawid/.codex/plugins/local/mcp-for-blender-source` |
| Marketplace Codex | `/Users/dawid/.codex/plugins/local/mcp-for-blender-source/integrations/codex` |
| Plugin Codex | `mcp-for-blender@mcp-for-blender`, wersja 2.1.1, włączony |
| Konfiguracja pluginu | `/Users/dawid/.codex/plugins/cache/mcp-for-blender/mcp-for-blender/2.1.1/.mcp.json` |
| Dodatek Blendera | „Interface: MCP for Blender”, wersja 1.8, protokół 13 |
| Plik dodatku | `/Users/dawid/Library/Application Support/Blender/5.2/scripts/addons/blender_mcp.py` |

Plugin uruchamia lokalne źródło przez `/opt/homebrew/bin/uvx`, z argumentami
`--python 3.11 --from /Users/dawid/.codex/plugins/local/mcp-for-blender-source mcp-for-blender`.
`UV_PYTHON_PREFERENCE=only-managed` wybiera interpreter zarządzany przez uv.
Wersje serwera, pluginu i dodatku mają osobną numerację. Wskazana kopia źródła
musi zostać na dysku, ponieważ serwer korzysta z niej przy uruchomieniu.

Plugin udostępnia podgląd viewportu i wybieranie zasobów dzięki
`BLENDER_MCP_APPS=1` oraz `BLENDER_MCP_OPENAI_FORMS=1`; limit narzędzia to 600 s.
Nie dodawaj równolegle osobnego wpisu `blender` przez `codex mcp add`: ta
instalacja już dostarcza serwer MCP przez plugin.

## Uruchomienie i podgląd

Otwórz Blender z interfejsem graficznym. Włączony dodatek automatycznie startuje
most na `localhost:9876` po załadowaniu sceny. Domyślne `Auto-Start Server` jest
włączone; ręczne `Disconnect` powstrzymuje ponowny start do kolejnego ręcznego
połączenia lub przeładowania dodatku. Tryb `--background` służy do skryptów
renderujących, ale nie uruchamia tego mostu.

W Codex użyj pluginu „MCP for Blender” i poproś o otwarcie viewportu. Jeżeli
narzędzia pluginu nie są dostępne w bieżącym czacie po instalacji, całkowicie
zamknij Codex przez `Cmd+Q` i otwórz ponownie. Dostępne narzędzia nie wymagają
rutynowego restartowania aplikacji.

Jeżeli połączenie nie działa:

1. W Blenderze sprawdź Preferences → Add-ons → „MCP for Blender” i włącz dodatek.
2. W widoku 3D naciśnij `N`, wybierz zakładkę „MCP for Blender” i kliknij
   `Connect to MCP server`. Prawidłowy stan pokazuje `Connected on port 9876`.
3. Sprawdź, czy plugin i dodatek używają tego samego portu. Gdy port zajmuje
   druga instancja Blendera, auto-start zostanie pominięty; korzystaj z jednej
   wybranej instancji. Nie uruchamiaj drugiego serwera MCP ręcznie w terminalu.

Podczas audytu proces Blendera nasłuchiwał na `127.0.0.1:9876`. Sprawdzono też
włączony plugin i jego lokalną konfigurację; dostępność narzędzi w nowym czacie
zależy od ich załadowania przez Codex.

## Telemetria

Zainstalowany plugin ma `DISABLE_TELEMETRY=true`, co wyłącza telemetrię serwera
MCP, także anonimowe statystyki użycia. Preferencja dodatku `Allow Telemetry`
domyślnie jest wyłączona.

Skrypty i render tła strony opisuje [blender-about-background.md](./blender-about-background.md).
