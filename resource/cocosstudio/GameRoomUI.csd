<GameFile>
  <PropertyGroup Name="GameRoomUI" Type="Layer" ID="95260d40-ca5b-4767-a0a5-8aa1b8853b0e" Version="3.10.0.0" />
  <Content ctype="GameProjectContent">
    <Content>
      <Animation Duration="0" Speed="1.0000" />
      <ObjectData Name="Layer" Tag="22" ctype="GameLayerObjectData">
        <Size X="1280.0000" Y="720.0000" />
        <Children>
          <AbstractNodeData Name="game_room_bg" ActionTag="-2090280328" Tag="300" IconVisible="False" PositionPercentXEnabled="True" PositionPercentYEnabled="True" LeftEage="422" RightEage="422" TopEage="237" BottomEage="237" Scale9OriginX="422" Scale9OriginY="237" Scale9Width="436" Scale9Height="246" ctype="ImageViewObjectData">
            <Size X="1280.0000" Y="720.0000" />
            <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
            <Position X="640.0000" Y="360.0000" />
            <Scale ScaleX="1.0000" ScaleY="1.0000" />
            <CColor A="255" R="255" G="255" B="255" />
            <PrePosition X="0.5000" Y="0.5000" />
            <PreSize X="1.0000" Y="1.0000" />
            <FileData Type="Normal" Path="BackGround/GameRoomBG.png" Plist="" />
          </AbstractNodeData>
          <AbstractNodeData Name="player_info_panel0" ActionTag="202090533" VisibleForFrame="False" Tag="1051" IconVisible="False" PositionPercentXEnabled="True" PositionPercentYEnabled="True" LeftMargin="383.0000" RightMargin="767.0000" TopMargin="500.4000" BottomMargin="39.6000" ClipAble="False" BackColorAlpha="127" ColorAngle="90.0000" Scale9Width="1" Scale9Height="1" ctype="PanelObjectData">
            <Size X="130.0000" Y="180.0000" />
            <Children>
              <AbstractNodeData Name="name_bg" ActionTag="780655288" Tag="1052" IconVisible="False" PositionPercentXEnabled="True" PositionPercentYEnabled="True" LeftMargin="19.6620" RightMargin="20.3380" TopMargin="105.2860" BottomMargin="46.7140" LeftEage="34" RightEage="34" TopEage="9" BottomEage="9" Scale9OriginX="34" Scale9OriginY="9" Scale9Width="22" Scale9Height="10" ctype="ImageViewObjectData">
                <Size X="90.0000" Y="28.0000" />
                <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                <Position X="64.6620" Y="60.7140" />
                <Scale ScaleX="1.0000" ScaleY="1.0000" />
                <CColor A="255" R="255" G="255" B="255" />
                <PrePosition X="0.4974" Y="0.3373" />
                <PreSize X="0.6923" Y="0.1556" />
                <FileData Type="Normal" Path="Default/name_bg.png" Plist="" />
              </AbstractNodeData>
              <AbstractNodeData Name="portrait_sprite" ActionTag="-1916630423" VisibleForFrame="False" Tag="1053" IconVisible="False" PositionPercentXEnabled="True" PositionPercentYEnabled="True" LeftMargin="40.0000" RightMargin="40.0000" TopMargin="65.0000" BottomMargin="65.0000" ctype="SpriteObjectData">
                <Size X="50.0000" Y="50.0000" />
                <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                <Position X="65.0000" Y="90.0000" />
                <Scale ScaleX="1.4500" ScaleY="1.4500" />
                <CColor A="255" R="255" G="255" B="255" />
                <PrePosition X="0.5000" Y="0.5000" />
                <PreSize X="0.3846" Y="0.2778" />
                <FileData Type="Normal" Path="Default/common_portrait_mask.png" Plist="" />
                <BlendFunc Src="1" Dst="771" />
              </AbstractNodeData>
              <AbstractNodeData Name="frame_img" ActionTag="17103589" Tag="1054" IconVisible="False" PositionPercentXEnabled="True" PositionPercentYEnabled="True" LeftMargin="19.0000" RightMargin="19.0000" TopMargin="43.0000" BottomMargin="43.0000" TouchEnable="True" LeftEage="24" RightEage="24" TopEage="24" BottomEage="24" Scale9OriginX="24" Scale9OriginY="24" Scale9Width="44" Scale9Height="46" ctype="ImageViewObjectData">
                <Size X="92.0000" Y="94.0000" />
                <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                <Position X="65.0000" Y="90.0000" />
                <Scale ScaleX="1.0000" ScaleY="1.0000" />
                <CColor A="255" R="255" G="255" B="255" />
                <PrePosition X="0.5000" Y="0.5000" />
                <PreSize X="0.7077" Y="0.5222" />
                <FileData Type="Normal" Path="Default/common_portrait_frame3.png" Plist="" />
              </AbstractNodeData>
              <AbstractNodeData Name="name_label" ActionTag="-2120137953" Tag="1055" IconVisible="False" PositionPercentXEnabled="True" PositionPercentYEnabled="True" LeftMargin="-5.0000" RightMargin="-5.0000" TopMargin="112.4000" BottomMargin="47.6000" IsCustomSize="True" FontSize="16" LabelText="我我我我我我我" HorizontalAlignmentType="HT_Center" ShadowOffsetX="2.0000" ShadowOffsetY="-2.0000" ctype="TextObjectData">
                <Size X="140.0000" Y="20.0000" />
                <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                <Position X="65.0000" Y="57.6000" />
                <Scale ScaleX="1.0000" ScaleY="1.0000" />
                <CColor A="255" R="190" G="232" B="255" />
                <PrePosition X="0.5000" Y="0.3200" />
                <PreSize X="1.0769" Y="0.1111" />
                <FontResource Type="Normal" Path="font/zhunyuan.ttf" Plist="" />
                <OutlineColor A="255" R="255" G="0" B="0" />
                <ShadowColor A="255" R="110" G="110" B="110" />
              </AbstractNodeData>
              <AbstractNodeData Name="score_img" ActionTag="-210236496" Tag="1056" IconVisible="False" PositionPercentXEnabled="True" PositionPercentYEnabled="True" LeftMargin="21.0020" RightMargin="16.9980" TopMargin="137.8960" BottomMargin="11.1040" LeftEage="45" RightEage="45" TopEage="13" BottomEage="13" Scale9OriginX="45" Scale9OriginY="13" Scale9Width="2" Scale9Height="5" ctype="ImageViewObjectData">
                <Size X="92.0000" Y="31.0000" />
                <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                <Position X="67.0020" Y="26.6040" />
                <Scale ScaleX="1.0000" ScaleY="1.0000" />
                <CColor A="255" R="255" G="255" B="255" />
                <PrePosition X="0.5154" Y="0.1478" />
                <PreSize X="0.7077" Y="0.1722" />
                <FileData Type="Normal" Path="Default/score_bg2.png" Plist="" />
              </AbstractNodeData>
              <AbstractNodeData Name="score_label" ActionTag="-1758389947" Tag="1057" IconVisible="False" PositionPercentXEnabled="True" PositionPercentYEnabled="True" LeftMargin="7.6000" RightMargin="2.4000" TopMargin="141.9020" BottomMargin="18.0980" IsCustomSize="True" FontSize="20" LabelText="0&#xA;" HorizontalAlignmentType="HT_Center" ShadowOffsetX="2.0000" ShadowOffsetY="-2.0000" ctype="TextObjectData">
                <Size X="120.0000" Y="20.0000" />
                <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                <Position X="67.6000" Y="28.0980" />
                <Scale ScaleX="1.0000" ScaleY="1.0000" />
                <CColor A="255" R="199" G="165" B="66" />
                <PrePosition X="0.5200" Y="0.1561" />
                <PreSize X="0.9231" Y="0.1111" />
                <FontResource Type="Normal" Path="font/zhunyuan.ttf" Plist="" />
                <OutlineColor A="255" R="255" G="0" B="0" />
                <ShadowColor A="255" R="110" G="110" B="110" />
              </AbstractNodeData>
              <AbstractNodeData Name="game_state_img" ActionTag="-1447500339" VisibleForFrame="False" Tag="57" IconVisible="False" PositionPercentXEnabled="True" PositionPercentYEnabled="True" LeftMargin="14.0000" RightMargin="14.0000" TopMargin="70.5000" BottomMargin="70.5000" LeftEage="15" RightEage="15" TopEage="10" BottomEage="10" Scale9OriginX="15" Scale9OriginY="10" Scale9Width="72" Scale9Height="19" ctype="ImageViewObjectData">
                <Size X="102.0000" Y="39.0000" />
                <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                <Position X="65.0000" Y="90.0000" />
                <Scale ScaleX="1.0000" ScaleY="1.0000" />
                <CColor A="255" R="255" G="255" B="255" />
                <PrePosition X="0.5000" Y="0.5000" />
                <PreSize X="0.7846" Y="0.2167" />
                <FileData Type="Normal" Path="GameRoomUI/state_wancheng.png" Plist="" />
              </AbstractNodeData>
              <AbstractNodeData Name="owner_img" ActionTag="1084924712" Tag="1059" IconVisible="False" PositionPercentXEnabled="True" PositionPercentYEnabled="True" LeftMargin="80.6000" RightMargin="23.4000" TopMargin="45.6000" BottomMargin="92.4000" LeftEage="21" RightEage="21" TopEage="34" BottomEage="34" Scale9OriginX="5" Scale9OriginY="8" Scale9Width="16" Scale9Height="26" ctype="ImageViewObjectData">
                <Size X="26.0000" Y="42.0000" />
                <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                <Position X="93.6000" Y="113.4000" />
                <Scale ScaleX="1.1000" ScaleY="1.1000" />
                <CColor A="255" R="255" G="255" B="255" />
                <PrePosition X="0.7200" Y="0.6300" />
                <PreSize X="0.2000" Y="0.2333" />
                <FileData Type="Normal" Path="Default/common_roomowner_img.png" Plist="" />
              </AbstractNodeData>
              <AbstractNodeData Name="state_img" Visible="False" ActionTag="-1470910396" VisibleForFrame="False" Tag="1060" IconVisible="False" PositionPercentXEnabled="True" PositionPercentYEnabled="True" LeftMargin="19.5000" RightMargin="84.5000" TopMargin="41.0000" BottomMargin="113.0000" LeftEage="8" RightEage="8" TopEage="11" BottomEage="11" Scale9OriginX="8" Scale9OriginY="11" Scale9Width="10" Scale9Height="4" ctype="ImageViewObjectData">
                <Size X="26.0000" Y="26.0000" />
                <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                <Position X="32.5000" Y="126.0000" />
                <Scale ScaleX="0.8000" ScaleY="0.8000" />
                <CColor A="255" R="255" G="255" B="255" />
                <PrePosition X="0.2500" Y="0.7000" />
                <PreSize X="0.2000" Y="0.1444" />
                <FileData Type="Normal" Path="GameRoomUI/state_online.png" Plist="" />
              </AbstractNodeData>
            </Children>
            <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
            <Position X="448.0000" Y="129.6000" />
            <Scale ScaleX="1.0000" ScaleY="1.0000" />
            <CColor A="255" R="255" G="255" B="255" />
            <PrePosition X="0.3500" Y="0.1800" />
            <PreSize X="0.1016" Y="0.2500" />
            <SingleColor A="255" R="0" G="0" B="0" />
            <FirstColor A="255" R="150" G="200" B="255" />
            <EndColor A="255" R="255" G="255" B="255" />
            <ColorVector ScaleY="1.0000" />
          </AbstractNodeData>
          <AbstractNodeData Name="pokers_panel0" ActionTag="-14310332" VisibleForFrame="False" Tag="55" IconVisible="False" PositionPercentXEnabled="True" PositionPercentYEnabled="True" LeftMargin="520.0000" RightMargin="520.0000" TopMargin="458.4000" BottomMargin="21.6000" ClipAble="False" BackColorAlpha="102" ColorAngle="90.0000" Scale9Width="1" Scale9Height="1" ctype="PanelObjectData">
            <Size X="240.0000" Y="240.0000" />
            <Children>
              <AbstractNodeData Name="poker11_img" ActionTag="1823197557" Tag="56" IconVisible="False" LeftMargin="37.0000" RightMargin="117.0000" TopMargin="-8.0000" BottomMargin="128.0000" LeftEage="28" RightEage="28" TopEage="39" BottomEage="39" Scale9OriginX="28" Scale9OriginY="39" Scale9Width="30" Scale9Height="42" ctype="ImageViewObjectData">
                <Size X="86.0000" Y="120.0000" />
                <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                <Position X="80.0000" Y="188.0000" />
                <Scale ScaleX="1.0000" ScaleY="1.0000" />
                <CColor A="255" R="255" G="255" B="255" />
                <PrePosition X="0.3333" Y="0.7833" />
                <PreSize X="0.3583" Y="0.5000" />
                <FileData Type="MarkedSubImage" Path="Poker/10.png" Plist="Poker.plist" />
              </AbstractNodeData>
              <AbstractNodeData Name="poker12_img" ActionTag="1687331435" Tag="57" IconVisible="False" LeftMargin="77.0000" RightMargin="77.0000" TopMargin="-8.0000" BottomMargin="128.0000" LeftEage="28" RightEage="28" TopEage="39" BottomEage="39" Scale9OriginX="28" Scale9OriginY="39" Scale9Width="30" Scale9Height="42" ctype="ImageViewObjectData">
                <Size X="86.0000" Y="120.0000" />
                <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                <Position X="120.0000" Y="188.0000" />
                <Scale ScaleX="1.0000" ScaleY="1.0000" />
                <CColor A="255" R="255" G="255" B="255" />
                <PrePosition X="0.5000" Y="0.7833" />
                <PreSize X="0.3583" Y="0.5000" />
                <FileData Type="MarkedSubImage" Path="Poker/11.png" Plist="Poker.plist" />
              </AbstractNodeData>
              <AbstractNodeData Name="poker13_img" ActionTag="-1777169257" Tag="58" IconVisible="False" LeftMargin="117.0000" RightMargin="37.0000" TopMargin="-8.0000" BottomMargin="128.0000" LeftEage="28" RightEage="28" TopEage="39" BottomEage="39" Scale9OriginX="28" Scale9OriginY="39" Scale9Width="30" Scale9Height="42" ctype="ImageViewObjectData">
                <Size X="86.0000" Y="120.0000" />
                <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                <Position X="160.0000" Y="188.0000" />
                <Scale ScaleX="1.0000" ScaleY="1.0000" />
                <CColor A="255" R="255" G="255" B="255" />
                <PrePosition X="0.6667" Y="0.7833" />
                <PreSize X="0.3583" Y="0.5000" />
                <FileData Type="MarkedSubImage" Path="Poker/12.png" Plist="Poker.plist" />
              </AbstractNodeData>
              <AbstractNodeData Name="poker21_img" ActionTag="1594428332" Tag="59" IconVisible="False" LeftMargin="-3.0000" RightMargin="157.0000" TopMargin="56.0000" BottomMargin="64.0000" LeftEage="28" RightEage="28" TopEage="39" BottomEage="39" Scale9OriginX="28" Scale9OriginY="39" Scale9Width="30" Scale9Height="42" ctype="ImageViewObjectData">
                <Size X="86.0000" Y="120.0000" />
                <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                <Position X="40.0000" Y="124.0000" />
                <Scale ScaleX="1.0000" ScaleY="1.0000" />
                <CColor A="255" R="255" G="255" B="255" />
                <PrePosition X="0.1667" Y="0.5167" />
                <PreSize X="0.3583" Y="0.5000" />
                <FileData Type="MarkedSubImage" Path="Poker/13.png" Plist="Poker.plist" />
              </AbstractNodeData>
              <AbstractNodeData Name="poker22_img" ActionTag="1034173362" Tag="60" IconVisible="False" LeftMargin="37.0000" RightMargin="117.0000" TopMargin="56.0000" BottomMargin="64.0000" LeftEage="28" RightEage="28" TopEage="39" BottomEage="39" Scale9OriginX="28" Scale9OriginY="39" Scale9Width="30" Scale9Height="42" ctype="ImageViewObjectData">
                <Size X="86.0000" Y="120.0000" />
                <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                <Position X="80.0000" Y="124.0000" />
                <Scale ScaleX="1.0000" ScaleY="1.0000" />
                <CColor A="255" R="255" G="255" B="255" />
                <PrePosition X="0.3333" Y="0.5167" />
                <PreSize X="0.3583" Y="0.5000" />
                <FileData Type="MarkedSubImage" Path="Poker/14.png" Plist="Poker.plist" />
              </AbstractNodeData>
              <AbstractNodeData Name="poker23_img" ActionTag="484316284" Tag="61" IconVisible="False" LeftMargin="77.0000" RightMargin="77.0000" TopMargin="56.0000" BottomMargin="64.0000" LeftEage="28" RightEage="28" TopEage="39" BottomEage="39" Scale9OriginX="28" Scale9OriginY="39" Scale9Width="30" Scale9Height="42" ctype="ImageViewObjectData">
                <Size X="86.0000" Y="120.0000" />
                <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                <Position X="120.0000" Y="124.0000" />
                <Scale ScaleX="1.0000" ScaleY="1.0000" />
                <CColor A="255" R="255" G="255" B="255" />
                <PrePosition X="0.5000" Y="0.5167" />
                <PreSize X="0.3583" Y="0.5000" />
                <FileData Type="MarkedSubImage" Path="Poker/20.png" Plist="Poker.plist" />
              </AbstractNodeData>
              <AbstractNodeData Name="poker24_img" ActionTag="-2108793863" Tag="62" IconVisible="False" LeftMargin="117.0000" RightMargin="37.0000" TopMargin="56.0000" BottomMargin="64.0000" LeftEage="28" RightEage="28" TopEage="39" BottomEage="39" Scale9OriginX="28" Scale9OriginY="39" Scale9Width="30" Scale9Height="42" ctype="ImageViewObjectData">
                <Size X="86.0000" Y="120.0000" />
                <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                <Position X="160.0000" Y="124.0000" />
                <Scale ScaleX="1.0000" ScaleY="1.0000" />
                <CColor A="255" R="255" G="255" B="255" />
                <PrePosition X="0.6667" Y="0.5167" />
                <PreSize X="0.3583" Y="0.5000" />
                <FileData Type="MarkedSubImage" Path="Poker/23.png" Plist="Poker.plist" />
              </AbstractNodeData>
              <AbstractNodeData Name="poker25_img" ActionTag="-561998604" Tag="63" IconVisible="False" LeftMargin="157.0000" RightMargin="-3.0000" TopMargin="56.0000" BottomMargin="64.0000" LeftEage="28" RightEage="28" TopEage="39" BottomEage="39" Scale9OriginX="28" Scale9OriginY="39" Scale9Width="30" Scale9Height="42" ctype="ImageViewObjectData">
                <Size X="86.0000" Y="120.0000" />
                <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                <Position X="200.0000" Y="124.0000" />
                <Scale ScaleX="1.0000" ScaleY="1.0000" />
                <CColor A="255" R="255" G="255" B="255" />
                <PrePosition X="0.8333" Y="0.5167" />
                <PreSize X="0.3583" Y="0.5000" />
                <FileData Type="MarkedSubImage" Path="Poker/26.png" Plist="Poker.plist" />
              </AbstractNodeData>
              <AbstractNodeData Name="poker31_img" ActionTag="-1402177092" Tag="64" IconVisible="False" LeftMargin="-3.0000" RightMargin="157.0000" TopMargin="120.0000" LeftEage="28" RightEage="28" TopEage="39" BottomEage="39" Scale9OriginX="28" Scale9OriginY="39" Scale9Width="30" Scale9Height="42" ctype="ImageViewObjectData">
                <Size X="86.0000" Y="120.0000" />
                <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                <Position X="40.0000" Y="60.0000" />
                <Scale ScaleX="1.0000" ScaleY="1.0000" />
                <CColor A="255" R="255" G="255" B="255" />
                <PrePosition X="0.1667" Y="0.2500" />
                <PreSize X="0.3583" Y="0.5000" />
                <FileData Type="MarkedSubImage" Path="Poker/29.png" Plist="Poker.plist" />
              </AbstractNodeData>
              <AbstractNodeData Name="poker32_img" ActionTag="477828233" Tag="65" IconVisible="False" LeftMargin="37.0000" RightMargin="117.0000" TopMargin="120.0000" LeftEage="28" RightEage="28" TopEage="39" BottomEage="39" Scale9OriginX="28" Scale9OriginY="39" Scale9Width="30" Scale9Height="42" ctype="ImageViewObjectData">
                <Size X="86.0000" Y="120.0000" />
                <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                <Position X="80.0000" Y="60.0000" />
                <Scale ScaleX="1.0000" ScaleY="1.0000" />
                <CColor A="255" R="255" G="255" B="255" />
                <PrePosition X="0.3333" Y="0.2500" />
                <PreSize X="0.3583" Y="0.5000" />
                <FileData Type="MarkedSubImage" Path="Poker/34.png" Plist="Poker.plist" />
              </AbstractNodeData>
              <AbstractNodeData Name="poker33_img" ActionTag="-1055544882" Tag="66" IconVisible="False" LeftMargin="77.0000" RightMargin="77.0000" TopMargin="120.0000" LeftEage="28" RightEage="28" TopEage="39" BottomEage="39" Scale9OriginX="28" Scale9OriginY="39" Scale9Width="30" Scale9Height="42" ctype="ImageViewObjectData">
                <Size X="86.0000" Y="120.0000" />
                <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                <Position X="120.0000" Y="60.0000" />
                <Scale ScaleX="1.0000" ScaleY="1.0000" />
                <CColor A="255" R="255" G="255" B="255" />
                <PrePosition X="0.5000" Y="0.2500" />
                <PreSize X="0.3583" Y="0.5000" />
                <FileData Type="MarkedSubImage" Path="Poker/37.png" Plist="Poker.plist" />
              </AbstractNodeData>
              <AbstractNodeData Name="poker34_img" ActionTag="964434317" Tag="67" IconVisible="False" LeftMargin="117.0000" RightMargin="37.0000" TopMargin="120.0000" LeftEage="28" RightEage="28" TopEage="39" BottomEage="39" Scale9OriginX="28" Scale9OriginY="39" Scale9Width="30" Scale9Height="42" ctype="ImageViewObjectData">
                <Size X="86.0000" Y="120.0000" />
                <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                <Position X="160.0000" Y="60.0000" />
                <Scale ScaleX="1.0000" ScaleY="1.0000" />
                <CColor A="255" R="255" G="255" B="255" />
                <PrePosition X="0.6667" Y="0.2500" />
                <PreSize X="0.3583" Y="0.5000" />
                <FileData Type="MarkedSubImage" Path="Poker/42.png" Plist="Poker.plist" />
              </AbstractNodeData>
              <AbstractNodeData Name="poker35_img" ActionTag="-1514022228" Tag="68" IconVisible="False" LeftMargin="157.0000" RightMargin="-3.0000" TopMargin="120.0000" LeftEage="28" RightEage="28" TopEage="39" BottomEage="39" Scale9OriginX="28" Scale9OriginY="39" Scale9Width="30" Scale9Height="42" ctype="ImageViewObjectData">
                <Size X="86.0000" Y="120.0000" />
                <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                <Position X="200.0000" Y="60.0000" />
                <Scale ScaleX="1.0000" ScaleY="1.0000" />
                <CColor A="255" R="255" G="255" B="255" />
                <PrePosition X="0.8333" Y="0.2500" />
                <PreSize X="0.3583" Y="0.5000" />
                <FileData Type="MarkedSubImage" Path="Poker/44.png" Plist="Poker.plist" />
              </AbstractNodeData>
              <AbstractNodeData Name="toudun_result_img" ActionTag="1248014354" Tag="70" IconVisible="False" LeftMargin="240.0000" RightMargin="-145.0000" TopMargin="-11.0000" BottomMargin="188.0000" LeftEage="47" RightEage="47" TopEage="20" BottomEage="20" Scale9OriginX="47" Scale9OriginY="20" Scale9Width="51" Scale9Height="23" ctype="ImageViewObjectData">
                <Size X="145.0000" Y="63.0000" />
                <AnchorPoint />
                <Position X="240.0000" Y="188.0000" />
                <Scale ScaleX="1.0000" ScaleY="1.0000" />
                <CColor A="255" R="255" G="255" B="255" />
                <PrePosition X="1.0000" Y="0.7833" />
                <PreSize X="0.6042" Y="0.2625" />
                <FileData Type="Normal" Path="Poker/paixing_duizi.png" Plist="" />
              </AbstractNodeData>
              <AbstractNodeData Name="zhongdun_result_img" ActionTag="1936928430" Tag="71" IconVisible="False" LeftMargin="240.0000" RightMargin="-145.0000" TopMargin="59.0000" BottomMargin="118.0000" LeftEage="47" RightEage="47" TopEage="20" BottomEage="20" Scale9OriginX="47" Scale9OriginY="20" Scale9Width="51" Scale9Height="23" ctype="ImageViewObjectData">
                <Size X="145.0000" Y="63.0000" />
                <AnchorPoint />
                <Position X="240.0000" Y="118.0000" />
                <Scale ScaleX="1.0000" ScaleY="1.0000" />
                <CColor A="255" R="255" G="255" B="255" />
                <PrePosition X="1.0000" Y="0.4917" />
                <PreSize X="0.6042" Y="0.2625" />
                <FileData Type="Normal" Path="Poker/paixing_liangdui.png" Plist="" />
              </AbstractNodeData>
              <AbstractNodeData Name="weidun_result_img" ActionTag="-1334774170" Tag="72" IconVisible="False" LeftMargin="240.0000" RightMargin="-145.0000" TopMargin="129.0000" BottomMargin="48.0000" LeftEage="28" RightEage="28" TopEage="20" BottomEage="20" Scale9OriginX="28" Scale9OriginY="20" Scale9Width="89" Scale9Height="23" ctype="ImageViewObjectData">
                <Size X="145.0000" Y="63.0000" />
                <AnchorPoint />
                <Position X="240.0000" Y="48.0000" />
                <Scale ScaleX="1.0000" ScaleY="1.0000" />
                <CColor A="255" R="255" G="255" B="255" />
                <PrePosition X="1.0000" Y="0.2000" />
                <PreSize X="0.6042" Y="0.2625" />
                <FileData Type="Normal" Path="Poker/paixing_shunzi.png" Plist="" />
              </AbstractNodeData>
            </Children>
            <AnchorPoint ScaleX="0.5000" />
            <Position X="640.0000" Y="21.6000" />
            <Scale ScaleX="0.9000" ScaleY="0.9000" />
            <CColor A="255" R="255" G="255" B="255" />
            <PrePosition X="0.5000" Y="0.0300" />
            <PreSize X="0.1875" Y="0.3333" />
            <SingleColor A="255" R="150" G="200" B="255" />
            <FirstColor A="255" R="150" G="200" B="255" />
            <EndColor A="255" R="255" G="255" B="255" />
            <ColorVector ScaleY="1.0000" />
          </AbstractNodeData>
          <AbstractNodeData Name="player_info_panel1" ActionTag="2063589705" VisibleForFrame="False" Tag="1081" IconVisible="False" PositionPercentXEnabled="True" PositionPercentYEnabled="True" LeftMargin="767.0000" RightMargin="383.0000" TopMargin="46.8000" BottomMargin="493.2000" ClipAble="False" BackColorAlpha="127" ColorAngle="90.0000" Scale9Width="1" Scale9Height="1" ctype="PanelObjectData">
            <Size X="130.0000" Y="180.0000" />
            <Children>
              <AbstractNodeData Name="name_bg" ActionTag="-471871184" Tag="1082" IconVisible="False" PositionPercentXEnabled="True" PositionPercentYEnabled="True" LeftMargin="19.6620" RightMargin="20.3380" TopMargin="105.2860" BottomMargin="46.7140" LeftEage="34" RightEage="34" TopEage="9" BottomEage="9" Scale9OriginX="34" Scale9OriginY="9" Scale9Width="22" Scale9Height="10" ctype="ImageViewObjectData">
                <Size X="90.0000" Y="28.0000" />
                <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                <Position X="64.6620" Y="60.7140" />
                <Scale ScaleX="1.0000" ScaleY="1.0000" />
                <CColor A="255" R="255" G="255" B="255" />
                <PrePosition X="0.4974" Y="0.3373" />
                <PreSize X="0.6923" Y="0.1556" />
                <FileData Type="Normal" Path="Default/name_bg.png" Plist="" />
              </AbstractNodeData>
              <AbstractNodeData Name="portrait_sprite" ActionTag="-1393032567" VisibleForFrame="False" Tag="1083" IconVisible="False" PositionPercentXEnabled="True" PositionPercentYEnabled="True" LeftMargin="40.0000" RightMargin="40.0000" TopMargin="65.0000" BottomMargin="65.0000" ctype="SpriteObjectData">
                <Size X="50.0000" Y="50.0000" />
                <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                <Position X="65.0000" Y="90.0000" />
                <Scale ScaleX="1.4500" ScaleY="1.4500" />
                <CColor A="255" R="255" G="255" B="255" />
                <PrePosition X="0.5000" Y="0.5000" />
                <PreSize X="0.3846" Y="0.2778" />
                <FileData Type="Normal" Path="Default/common_portrait_mask.png" Plist="" />
                <BlendFunc Src="1" Dst="771" />
              </AbstractNodeData>
              <AbstractNodeData Name="frame_img" ActionTag="-988231597" Tag="1084" IconVisible="False" PositionPercentXEnabled="True" PositionPercentYEnabled="True" LeftMargin="19.0000" RightMargin="19.0000" TopMargin="43.0000" BottomMargin="43.0000" TouchEnable="True" LeftEage="24" RightEage="24" TopEage="24" BottomEage="24" Scale9OriginX="24" Scale9OriginY="24" Scale9Width="44" Scale9Height="46" ctype="ImageViewObjectData">
                <Size X="92.0000" Y="94.0000" />
                <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                <Position X="65.0000" Y="90.0000" />
                <Scale ScaleX="1.0000" ScaleY="1.0000" />
                <CColor A="255" R="255" G="255" B="255" />
                <PrePosition X="0.5000" Y="0.5000" />
                <PreSize X="0.7077" Y="0.5222" />
                <FileData Type="Normal" Path="Default/common_portrait_frame3.png" Plist="" />
              </AbstractNodeData>
              <AbstractNodeData Name="name_label" ActionTag="-2021847583" Tag="1085" IconVisible="False" PositionPercentXEnabled="True" PositionPercentYEnabled="True" LeftMargin="-5.0000" RightMargin="-5.0000" TopMargin="112.4000" BottomMargin="47.6000" IsCustomSize="True" FontSize="16" LabelText="我我我我我我我" HorizontalAlignmentType="HT_Center" ShadowOffsetX="2.0000" ShadowOffsetY="-2.0000" ctype="TextObjectData">
                <Size X="140.0000" Y="20.0000" />
                <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                <Position X="65.0000" Y="57.6000" />
                <Scale ScaleX="1.0000" ScaleY="1.0000" />
                <CColor A="255" R="190" G="232" B="255" />
                <PrePosition X="0.5000" Y="0.3200" />
                <PreSize X="1.0769" Y="0.1111" />
                <FontResource Type="Normal" Path="font/zhunyuan.ttf" Plist="" />
                <OutlineColor A="255" R="255" G="0" B="0" />
                <ShadowColor A="255" R="110" G="110" B="110" />
              </AbstractNodeData>
              <AbstractNodeData Name="score_img" ActionTag="1497511715" Tag="1086" IconVisible="False" PositionPercentXEnabled="True" PositionPercentYEnabled="True" LeftMargin="21.0020" RightMargin="16.9980" TopMargin="137.8960" BottomMargin="11.1040" LeftEage="45" RightEage="45" TopEage="13" BottomEage="13" Scale9OriginX="45" Scale9OriginY="13" Scale9Width="2" Scale9Height="5" ctype="ImageViewObjectData">
                <Size X="92.0000" Y="31.0000" />
                <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                <Position X="67.0020" Y="26.6040" />
                <Scale ScaleX="1.0000" ScaleY="1.0000" />
                <CColor A="255" R="255" G="255" B="255" />
                <PrePosition X="0.5154" Y="0.1478" />
                <PreSize X="0.7077" Y="0.1722" />
                <FileData Type="Normal" Path="Default/score_bg2.png" Plist="" />
              </AbstractNodeData>
              <AbstractNodeData Name="score_label" ActionTag="1956930531" Tag="1087" IconVisible="False" PositionPercentXEnabled="True" PositionPercentYEnabled="True" LeftMargin="7.6000" RightMargin="2.4000" TopMargin="141.9020" BottomMargin="18.0980" IsCustomSize="True" FontSize="20" LabelText="0&#xA;" HorizontalAlignmentType="HT_Center" ShadowOffsetX="2.0000" ShadowOffsetY="-2.0000" ctype="TextObjectData">
                <Size X="120.0000" Y="20.0000" />
                <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                <Position X="67.6000" Y="28.0980" />
                <Scale ScaleX="1.0000" ScaleY="1.0000" />
                <CColor A="255" R="199" G="165" B="66" />
                <PrePosition X="0.5200" Y="0.1561" />
                <PreSize X="0.9231" Y="0.1111" />
                <FontResource Type="Normal" Path="font/zhunyuan.ttf" Plist="" />
                <OutlineColor A="255" R="255" G="0" B="0" />
                <ShadowColor A="255" R="110" G="110" B="110" />
              </AbstractNodeData>
              <AbstractNodeData Name="game_state_img" ActionTag="-212654230" VisibleForFrame="False" Tag="997" IconVisible="False" PositionPercentXEnabled="True" PositionPercentYEnabled="True" LeftMargin="14.0000" RightMargin="14.0000" TopMargin="70.5000" BottomMargin="70.5000" LeftEage="15" RightEage="15" TopEage="10" BottomEage="10" Scale9OriginX="15" Scale9OriginY="10" Scale9Width="72" Scale9Height="19" ctype="ImageViewObjectData">
                <Size X="102.0000" Y="39.0000" />
                <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                <Position X="65.0000" Y="90.0000" />
                <Scale ScaleX="1.0000" ScaleY="1.0000" />
                <CColor A="255" R="255" G="255" B="255" />
                <PrePosition X="0.5000" Y="0.5000" />
                <PreSize X="0.7846" Y="0.2167" />
                <FileData Type="Normal" Path="GameRoomUI/state_wancheng.png" Plist="" />
              </AbstractNodeData>
              <AbstractNodeData Name="owner_img" ActionTag="-1298882869" Tag="1089" IconVisible="False" PositionPercentXEnabled="True" PositionPercentYEnabled="True" LeftMargin="80.6000" RightMargin="23.4000" TopMargin="45.6000" BottomMargin="92.4000" LeftEage="21" RightEage="21" TopEage="34" BottomEage="34" Scale9OriginX="5" Scale9OriginY="8" Scale9Width="16" Scale9Height="26" ctype="ImageViewObjectData">
                <Size X="26.0000" Y="42.0000" />
                <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                <Position X="93.6000" Y="113.4000" />
                <Scale ScaleX="1.1000" ScaleY="1.1000" />
                <CColor A="255" R="255" G="255" B="255" />
                <PrePosition X="0.7200" Y="0.6300" />
                <PreSize X="0.2000" Y="0.2333" />
                <FileData Type="Normal" Path="Default/common_roomowner_img.png" Plist="" />
              </AbstractNodeData>
              <AbstractNodeData Name="state_img" Visible="False" ActionTag="-552274710" VisibleForFrame="False" Tag="1090" IconVisible="False" PositionPercentXEnabled="True" PositionPercentYEnabled="True" LeftMargin="19.5000" RightMargin="84.5000" TopMargin="41.0000" BottomMargin="113.0000" LeftEage="33" RightEage="33" TopEage="11" BottomEage="11" Scale9OriginX="-7" Scale9OriginY="11" Scale9Width="40" Scale9Height="4" ctype="ImageViewObjectData">
                <Size X="26.0000" Y="26.0000" />
                <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                <Position X="32.5000" Y="126.0000" />
                <Scale ScaleX="0.8000" ScaleY="0.8000" />
                <CColor A="255" R="255" G="255" B="255" />
                <PrePosition X="0.2500" Y="0.7000" />
                <PreSize X="0.2000" Y="0.1444" />
                <FileData Type="Normal" Path="GameRoomUI/state_online.png" Plist="" />
              </AbstractNodeData>
            </Children>
            <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
            <Position X="832.0000" Y="583.2000" />
            <Scale ScaleX="1.0000" ScaleY="1.0000" />
            <CColor A="255" R="255" G="255" B="255" />
            <PrePosition X="0.6500" Y="0.8100" />
            <PreSize X="0.1016" Y="0.2500" />
            <SingleColor A="255" R="0" G="0" B="0" />
            <FirstColor A="255" R="150" G="200" B="255" />
            <EndColor A="255" R="255" G="255" B="255" />
            <ColorVector ScaleY="1.0000" />
          </AbstractNodeData>
          <AbstractNodeData Name="pokers_panel1" ActionTag="-2115297258" VisibleForFrame="False" Tag="70" IconVisible="False" PositionPercentXEnabled="True" PositionPercentYEnabled="True" LeftMargin="520.0000" RightMargin="520.0000" TopMargin="100.8000" BottomMargin="379.2000" ClipAble="False" BackColorAlpha="102" ColorAngle="90.0000" Scale9Width="1" Scale9Height="1" ctype="PanelObjectData">
            <Size X="240.0000" Y="240.0000" />
            <Children>
              <AbstractNodeData Name="poker11_img" ActionTag="778494930" Tag="71" IconVisible="False" LeftMargin="37.0000" RightMargin="117.0000" TopMargin="-8.0000" BottomMargin="128.0000" LeftEage="28" RightEage="28" TopEage="39" BottomEage="39" Scale9OriginX="28" Scale9OriginY="39" Scale9Width="30" Scale9Height="42" ctype="ImageViewObjectData">
                <Size X="86.0000" Y="120.0000" />
                <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                <Position X="80.0000" Y="188.0000" />
                <Scale ScaleX="1.0000" ScaleY="1.0000" />
                <CColor A="255" R="255" G="255" B="255" />
                <PrePosition X="0.3333" Y="0.7833" />
                <PreSize X="0.3583" Y="0.5000" />
                <FileData Type="MarkedSubImage" Path="Poker/10.png" Plist="Poker.plist" />
              </AbstractNodeData>
              <AbstractNodeData Name="poker12_img" ActionTag="-2050666310" Tag="72" IconVisible="False" LeftMargin="77.0000" RightMargin="77.0000" TopMargin="-8.0000" BottomMargin="128.0000" LeftEage="28" RightEage="28" TopEage="39" BottomEage="39" Scale9OriginX="28" Scale9OriginY="39" Scale9Width="30" Scale9Height="42" ctype="ImageViewObjectData">
                <Size X="86.0000" Y="120.0000" />
                <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                <Position X="120.0000" Y="188.0000" />
                <Scale ScaleX="1.0000" ScaleY="1.0000" />
                <CColor A="255" R="255" G="255" B="255" />
                <PrePosition X="0.5000" Y="0.7833" />
                <PreSize X="0.3583" Y="0.5000" />
                <FileData Type="MarkedSubImage" Path="Poker/11.png" Plist="Poker.plist" />
              </AbstractNodeData>
              <AbstractNodeData Name="poker13_img" ActionTag="-1128092770" Tag="73" IconVisible="False" LeftMargin="117.0000" RightMargin="37.0000" TopMargin="-8.0000" BottomMargin="128.0000" LeftEage="28" RightEage="28" TopEage="39" BottomEage="39" Scale9OriginX="28" Scale9OriginY="39" Scale9Width="30" Scale9Height="42" ctype="ImageViewObjectData">
                <Size X="86.0000" Y="120.0000" />
                <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                <Position X="160.0000" Y="188.0000" />
                <Scale ScaleX="1.0000" ScaleY="1.0000" />
                <CColor A="255" R="255" G="255" B="255" />
                <PrePosition X="0.6667" Y="0.7833" />
                <PreSize X="0.3583" Y="0.5000" />
                <FileData Type="MarkedSubImage" Path="Poker/12.png" Plist="Poker.plist" />
              </AbstractNodeData>
              <AbstractNodeData Name="poker21_img" ActionTag="-1954881715" Tag="74" IconVisible="False" LeftMargin="-3.0000" RightMargin="157.0000" TopMargin="56.0000" BottomMargin="64.0000" LeftEage="28" RightEage="28" TopEage="39" BottomEage="39" Scale9OriginX="28" Scale9OriginY="39" Scale9Width="30" Scale9Height="42" ctype="ImageViewObjectData">
                <Size X="86.0000" Y="120.0000" />
                <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                <Position X="40.0000" Y="124.0000" />
                <Scale ScaleX="1.0000" ScaleY="1.0000" />
                <CColor A="255" R="255" G="255" B="255" />
                <PrePosition X="0.1667" Y="0.5167" />
                <PreSize X="0.3583" Y="0.5000" />
                <FileData Type="MarkedSubImage" Path="Poker/13.png" Plist="Poker.plist" />
              </AbstractNodeData>
              <AbstractNodeData Name="poker22_img" ActionTag="-307877567" Tag="75" IconVisible="False" LeftMargin="37.0000" RightMargin="117.0000" TopMargin="56.0000" BottomMargin="64.0000" LeftEage="28" RightEage="28" TopEage="39" BottomEage="39" Scale9OriginX="28" Scale9OriginY="39" Scale9Width="30" Scale9Height="42" ctype="ImageViewObjectData">
                <Size X="86.0000" Y="120.0000" />
                <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                <Position X="80.0000" Y="124.0000" />
                <Scale ScaleX="1.0000" ScaleY="1.0000" />
                <CColor A="255" R="255" G="255" B="255" />
                <PrePosition X="0.3333" Y="0.5167" />
                <PreSize X="0.3583" Y="0.5000" />
                <FileData Type="MarkedSubImage" Path="Poker/14.png" Plist="Poker.plist" />
              </AbstractNodeData>
              <AbstractNodeData Name="poker23_img" ActionTag="51066615" Tag="76" IconVisible="False" LeftMargin="77.0000" RightMargin="77.0000" TopMargin="56.0000" BottomMargin="64.0000" LeftEage="28" RightEage="28" TopEage="39" BottomEage="39" Scale9OriginX="28" Scale9OriginY="39" Scale9Width="30" Scale9Height="42" ctype="ImageViewObjectData">
                <Size X="86.0000" Y="120.0000" />
                <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                <Position X="120.0000" Y="124.0000" />
                <Scale ScaleX="1.0000" ScaleY="1.0000" />
                <CColor A="255" R="255" G="255" B="255" />
                <PrePosition X="0.5000" Y="0.5167" />
                <PreSize X="0.3583" Y="0.5000" />
                <FileData Type="MarkedSubImage" Path="Poker/20.png" Plist="Poker.plist" />
              </AbstractNodeData>
              <AbstractNodeData Name="poker24_img" ActionTag="2109439160" Tag="77" IconVisible="False" LeftMargin="117.0000" RightMargin="37.0000" TopMargin="56.0000" BottomMargin="64.0000" LeftEage="28" RightEage="28" TopEage="39" BottomEage="39" Scale9OriginX="28" Scale9OriginY="39" Scale9Width="30" Scale9Height="42" ctype="ImageViewObjectData">
                <Size X="86.0000" Y="120.0000" />
                <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                <Position X="160.0000" Y="124.0000" />
                <Scale ScaleX="1.0000" ScaleY="1.0000" />
                <CColor A="255" R="255" G="255" B="255" />
                <PrePosition X="0.6667" Y="0.5167" />
                <PreSize X="0.3583" Y="0.5000" />
                <FileData Type="MarkedSubImage" Path="Poker/23.png" Plist="Poker.plist" />
              </AbstractNodeData>
              <AbstractNodeData Name="poker25_img" ActionTag="1949608236" Tag="78" IconVisible="False" LeftMargin="157.0000" RightMargin="-3.0000" TopMargin="56.0000" BottomMargin="64.0000" LeftEage="28" RightEage="28" TopEage="39" BottomEage="39" Scale9OriginX="28" Scale9OriginY="39" Scale9Width="30" Scale9Height="42" ctype="ImageViewObjectData">
                <Size X="86.0000" Y="120.0000" />
                <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                <Position X="200.0000" Y="124.0000" />
                <Scale ScaleX="1.0000" ScaleY="1.0000" />
                <CColor A="255" R="255" G="255" B="255" />
                <PrePosition X="0.8333" Y="0.5167" />
                <PreSize X="0.3583" Y="0.5000" />
                <FileData Type="MarkedSubImage" Path="Poker/26.png" Plist="Poker.plist" />
              </AbstractNodeData>
              <AbstractNodeData Name="poker31_img" ActionTag="763898730" Tag="79" IconVisible="False" LeftMargin="-3.0000" RightMargin="157.0000" TopMargin="120.0000" LeftEage="28" RightEage="28" TopEage="39" BottomEage="39" Scale9OriginX="28" Scale9OriginY="39" Scale9Width="30" Scale9Height="42" ctype="ImageViewObjectData">
                <Size X="86.0000" Y="120.0000" />
                <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                <Position X="40.0000" Y="60.0000" />
                <Scale ScaleX="1.0000" ScaleY="1.0000" />
                <CColor A="255" R="255" G="255" B="255" />
                <PrePosition X="0.1667" Y="0.2500" />
                <PreSize X="0.3583" Y="0.5000" />
                <FileData Type="MarkedSubImage" Path="Poker/29.png" Plist="Poker.plist" />
              </AbstractNodeData>
              <AbstractNodeData Name="poker32_img" ActionTag="-1872761886" Tag="80" IconVisible="False" LeftMargin="37.0000" RightMargin="117.0000" TopMargin="120.0000" LeftEage="28" RightEage="28" TopEage="39" BottomEage="39" Scale9OriginX="28" Scale9OriginY="39" Scale9Width="30" Scale9Height="42" ctype="ImageViewObjectData">
                <Size X="86.0000" Y="120.0000" />
                <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                <Position X="80.0000" Y="60.0000" />
                <Scale ScaleX="1.0000" ScaleY="1.0000" />
                <CColor A="255" R="255" G="255" B="255" />
                <PrePosition X="0.3333" Y="0.2500" />
                <PreSize X="0.3583" Y="0.5000" />
                <FileData Type="MarkedSubImage" Path="Poker/34.png" Plist="Poker.plist" />
              </AbstractNodeData>
              <AbstractNodeData Name="poker33_img" ActionTag="-419895757" Tag="81" IconVisible="False" LeftMargin="77.0000" RightMargin="77.0000" TopMargin="120.0000" LeftEage="28" RightEage="28" TopEage="39" BottomEage="39" Scale9OriginX="28" Scale9OriginY="39" Scale9Width="30" Scale9Height="42" ctype="ImageViewObjectData">
                <Size X="86.0000" Y="120.0000" />
                <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                <Position X="120.0000" Y="60.0000" />
                <Scale ScaleX="1.0000" ScaleY="1.0000" />
                <CColor A="255" R="255" G="255" B="255" />
                <PrePosition X="0.5000" Y="0.2500" />
                <PreSize X="0.3583" Y="0.5000" />
                <FileData Type="MarkedSubImage" Path="Poker/37.png" Plist="Poker.plist" />
              </AbstractNodeData>
              <AbstractNodeData Name="poker34_img" ActionTag="1735372585" Tag="82" IconVisible="False" LeftMargin="117.0000" RightMargin="37.0000" TopMargin="120.0000" LeftEage="28" RightEage="28" TopEage="39" BottomEage="39" Scale9OriginX="28" Scale9OriginY="39" Scale9Width="30" Scale9Height="42" ctype="ImageViewObjectData">
                <Size X="86.0000" Y="120.0000" />
                <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                <Position X="160.0000" Y="60.0000" />
                <Scale ScaleX="1.0000" ScaleY="1.0000" />
                <CColor A="255" R="255" G="255" B="255" />
                <PrePosition X="0.6667" Y="0.2500" />
                <PreSize X="0.3583" Y="0.5000" />
                <FileData Type="MarkedSubImage" Path="Poker/42.png" Plist="Poker.plist" />
              </AbstractNodeData>
              <AbstractNodeData Name="poker35_img" ActionTag="-227909307" Tag="83" IconVisible="False" LeftMargin="157.0000" RightMargin="-3.0000" TopMargin="120.0000" LeftEage="28" RightEage="28" TopEage="39" BottomEage="39" Scale9OriginX="28" Scale9OriginY="39" Scale9Width="30" Scale9Height="42" ctype="ImageViewObjectData">
                <Size X="86.0000" Y="120.0000" />
                <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                <Position X="200.0000" Y="60.0000" />
                <Scale ScaleX="1.0000" ScaleY="1.0000" />
                <CColor A="255" R="255" G="255" B="255" />
                <PrePosition X="0.8333" Y="0.2500" />
                <PreSize X="0.3583" Y="0.5000" />
                <FileData Type="MarkedSubImage" Path="Poker/44.png" Plist="Poker.plist" />
              </AbstractNodeData>
              <AbstractNodeData Name="toudun_result_img" ActionTag="2095878795" Tag="84" IconVisible="False" LeftMargin="-145.0000" RightMargin="240.0000" TopMargin="-11.0000" BottomMargin="188.0000" LeftEage="47" RightEage="47" TopEage="20" BottomEage="20" Scale9OriginX="47" Scale9OriginY="20" Scale9Width="51" Scale9Height="23" ctype="ImageViewObjectData">
                <Size X="145.0000" Y="63.0000" />
                <AnchorPoint ScaleX="1.0000" />
                <Position Y="188.0000" />
                <Scale ScaleX="1.0000" ScaleY="1.0000" />
                <CColor A="255" R="255" G="255" B="255" />
                <PrePosition Y="0.7833" />
                <PreSize X="0.6042" Y="0.2625" />
                <FileData Type="Normal" Path="Poker/paixing_duizi.png" Plist="" />
              </AbstractNodeData>
              <AbstractNodeData Name="zhongdun_result_img" ActionTag="-639494252" Tag="85" IconVisible="False" LeftMargin="-145.0000" RightMargin="240.0000" TopMargin="59.0000" BottomMargin="118.0000" LeftEage="47" RightEage="47" TopEage="20" BottomEage="20" Scale9OriginX="47" Scale9OriginY="20" Scale9Width="51" Scale9Height="23" ctype="ImageViewObjectData">
                <Size X="145.0000" Y="63.0000" />
                <AnchorPoint ScaleX="1.0000" />
                <Position Y="118.0000" />
                <Scale ScaleX="1.0000" ScaleY="1.0000" />
                <CColor A="255" R="255" G="255" B="255" />
                <PrePosition Y="0.4917" />
                <PreSize X="0.6042" Y="0.2625" />
                <FileData Type="Normal" Path="Poker/paixing_liangdui.png" Plist="" />
              </AbstractNodeData>
              <AbstractNodeData Name="weidun_result_img" ActionTag="-573230196" Tag="86" IconVisible="False" LeftMargin="-145.0000" RightMargin="240.0000" TopMargin="129.0000" BottomMargin="48.0000" LeftEage="28" RightEage="28" TopEage="20" BottomEage="20" Scale9OriginX="28" Scale9OriginY="20" Scale9Width="89" Scale9Height="23" ctype="ImageViewObjectData">
                <Size X="145.0000" Y="63.0000" />
                <AnchorPoint ScaleX="1.0000" />
                <Position Y="48.0000" />
                <Scale ScaleX="1.0000" ScaleY="1.0000" />
                <CColor A="255" R="255" G="255" B="255" />
                <PrePosition Y="0.2000" />
                <PreSize X="0.6042" Y="0.2625" />
                <FileData Type="Normal" Path="Poker/paixing_shunzi.png" Plist="" />
              </AbstractNodeData>
            </Children>
            <AnchorPoint ScaleX="0.5000" ScaleY="1.0000" />
            <Position X="640.0000" Y="619.2000" />
            <Scale ScaleX="0.9000" ScaleY="0.9000" />
            <CColor A="255" R="255" G="255" B="255" />
            <PrePosition X="0.5000" Y="0.8600" />
            <PreSize X="0.1875" Y="0.3333" />
            <SingleColor A="255" R="150" G="200" B="255" />
            <FirstColor A="255" R="150" G="200" B="255" />
            <EndColor A="255" R="255" G="255" B="255" />
            <ColorVector ScaleY="1.0000" />
          </AbstractNodeData>
          <AbstractNodeData Name="player_info_panel2" ActionTag="-2054747334" VisibleForFrame="False" Tag="1071" IconVisible="False" PositionPercentXEnabled="True" PositionPercentYEnabled="True" LeftMargin="25.6000" RightMargin="1124.4000" TopMargin="284.4000" BottomMargin="255.6000" ClipAble="False" BackColorAlpha="127" ColorAngle="90.0000" Scale9Width="1" Scale9Height="1" ctype="PanelObjectData">
            <Size X="130.0000" Y="180.0000" />
            <Children>
              <AbstractNodeData Name="name_bg" ActionTag="970045921" Tag="1072" IconVisible="False" PositionPercentXEnabled="True" PositionPercentYEnabled="True" LeftMargin="19.6620" RightMargin="20.3380" TopMargin="105.2860" BottomMargin="46.7140" LeftEage="34" RightEage="34" TopEage="9" BottomEage="9" Scale9OriginX="34" Scale9OriginY="9" Scale9Width="22" Scale9Height="10" ctype="ImageViewObjectData">
                <Size X="90.0000" Y="28.0000" />
                <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                <Position X="64.6620" Y="60.7140" />
                <Scale ScaleX="1.0000" ScaleY="1.0000" />
                <CColor A="255" R="255" G="255" B="255" />
                <PrePosition X="0.4974" Y="0.3373" />
                <PreSize X="0.6923" Y="0.1556" />
                <FileData Type="Normal" Path="Default/name_bg.png" Plist="" />
              </AbstractNodeData>
              <AbstractNodeData Name="portrait_sprite" ActionTag="-1803042237" VisibleForFrame="False" Tag="1073" IconVisible="False" PositionPercentXEnabled="True" PositionPercentYEnabled="True" LeftMargin="40.0000" RightMargin="40.0000" TopMargin="65.0000" BottomMargin="65.0000" ctype="SpriteObjectData">
                <Size X="50.0000" Y="50.0000" />
                <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                <Position X="65.0000" Y="90.0000" />
                <Scale ScaleX="1.4500" ScaleY="1.4500" />
                <CColor A="255" R="255" G="255" B="255" />
                <PrePosition X="0.5000" Y="0.5000" />
                <PreSize X="0.3846" Y="0.2778" />
                <FileData Type="Normal" Path="Default/common_portrait_mask.png" Plist="" />
                <BlendFunc Src="1" Dst="771" />
              </AbstractNodeData>
              <AbstractNodeData Name="frame_img" ActionTag="2125686320" Tag="1074" IconVisible="False" PositionPercentXEnabled="True" PositionPercentYEnabled="True" LeftMargin="19.0000" RightMargin="19.0000" TopMargin="43.0000" BottomMargin="43.0000" TouchEnable="True" LeftEage="24" RightEage="24" TopEage="24" BottomEage="24" Scale9OriginX="24" Scale9OriginY="24" Scale9Width="44" Scale9Height="46" ctype="ImageViewObjectData">
                <Size X="92.0000" Y="94.0000" />
                <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                <Position X="65.0000" Y="90.0000" />
                <Scale ScaleX="1.0000" ScaleY="1.0000" />
                <CColor A="255" R="255" G="255" B="255" />
                <PrePosition X="0.5000" Y="0.5000" />
                <PreSize X="0.7077" Y="0.5222" />
                <FileData Type="Normal" Path="Default/common_portrait_frame3.png" Plist="" />
              </AbstractNodeData>
              <AbstractNodeData Name="name_label" ActionTag="2023487951" Tag="1075" IconVisible="False" PositionPercentXEnabled="True" PositionPercentYEnabled="True" LeftMargin="-5.0000" RightMargin="-5.0000" TopMargin="112.4000" BottomMargin="47.6000" IsCustomSize="True" FontSize="16" LabelText="我我我我我我我" HorizontalAlignmentType="HT_Center" ShadowOffsetX="2.0000" ShadowOffsetY="-2.0000" ctype="TextObjectData">
                <Size X="140.0000" Y="20.0000" />
                <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                <Position X="65.0000" Y="57.6000" />
                <Scale ScaleX="1.0000" ScaleY="1.0000" />
                <CColor A="255" R="190" G="232" B="255" />
                <PrePosition X="0.5000" Y="0.3200" />
                <PreSize X="1.0769" Y="0.1111" />
                <FontResource Type="Normal" Path="font/zhunyuan.ttf" Plist="" />
                <OutlineColor A="255" R="255" G="0" B="0" />
                <ShadowColor A="255" R="110" G="110" B="110" />
              </AbstractNodeData>
              <AbstractNodeData Name="score_img" ActionTag="1835013431" Tag="1076" IconVisible="False" PositionPercentXEnabled="True" PositionPercentYEnabled="True" LeftMargin="21.0020" RightMargin="16.9980" TopMargin="137.8960" BottomMargin="11.1040" LeftEage="45" RightEage="45" TopEage="13" BottomEage="13" Scale9OriginX="45" Scale9OriginY="13" Scale9Width="2" Scale9Height="5" ctype="ImageViewObjectData">
                <Size X="92.0000" Y="31.0000" />
                <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                <Position X="67.0020" Y="26.6040" />
                <Scale ScaleX="1.0000" ScaleY="1.0000" />
                <CColor A="255" R="255" G="255" B="255" />
                <PrePosition X="0.5154" Y="0.1478" />
                <PreSize X="0.7077" Y="0.1722" />
                <FileData Type="Normal" Path="Default/score_bg2.png" Plist="" />
              </AbstractNodeData>
              <AbstractNodeData Name="score_label" ActionTag="30407969" Tag="1077" IconVisible="False" PositionPercentXEnabled="True" PositionPercentYEnabled="True" LeftMargin="7.6000" RightMargin="2.4000" TopMargin="141.9020" BottomMargin="18.0980" IsCustomSize="True" FontSize="20" LabelText="0&#xA;" HorizontalAlignmentType="HT_Center" ShadowOffsetX="2.0000" ShadowOffsetY="-2.0000" ctype="TextObjectData">
                <Size X="120.0000" Y="20.0000" />
                <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                <Position X="67.6000" Y="28.0980" />
                <Scale ScaleX="1.0000" ScaleY="1.0000" />
                <CColor A="255" R="199" G="165" B="66" />
                <PrePosition X="0.5200" Y="0.1561" />
                <PreSize X="0.9231" Y="0.1111" />
                <FontResource Type="Normal" Path="font/zhunyuan.ttf" Plist="" />
                <OutlineColor A="255" R="255" G="0" B="0" />
                <ShadowColor A="255" R="110" G="110" B="110" />
              </AbstractNodeData>
              <AbstractNodeData Name="game_state_img" ActionTag="-625842283" VisibleForFrame="False" Tag="1007" IconVisible="False" PositionPercentXEnabled="True" PositionPercentYEnabled="True" LeftMargin="14.0000" RightMargin="14.0000" TopMargin="70.5000" BottomMargin="70.5000" LeftEage="15" RightEage="15" TopEage="10" BottomEage="10" Scale9OriginX="15" Scale9OriginY="10" Scale9Width="72" Scale9Height="19" ctype="ImageViewObjectData">
                <Size X="102.0000" Y="39.0000" />
                <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                <Position X="65.0000" Y="90.0000" />
                <Scale ScaleX="1.0000" ScaleY="1.0000" />
                <CColor A="255" R="255" G="255" B="255" />
                <PrePosition X="0.5000" Y="0.5000" />
                <PreSize X="0.7846" Y="0.2167" />
                <FileData Type="Normal" Path="GameRoomUI/state_wancheng.png" Plist="" />
              </AbstractNodeData>
              <AbstractNodeData Name="owner_img" ActionTag="1412752009" Tag="1079" IconVisible="False" PositionPercentXEnabled="True" PositionPercentYEnabled="True" LeftMargin="80.6000" RightMargin="23.4000" TopMargin="45.6000" BottomMargin="92.4000" LeftEage="21" RightEage="21" TopEage="34" BottomEage="34" Scale9OriginX="5" Scale9OriginY="8" Scale9Width="16" Scale9Height="26" ctype="ImageViewObjectData">
                <Size X="26.0000" Y="42.0000" />
                <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                <Position X="93.6000" Y="113.4000" />
                <Scale ScaleX="1.1000" ScaleY="1.1000" />
                <CColor A="255" R="255" G="255" B="255" />
                <PrePosition X="0.7200" Y="0.6300" />
                <PreSize X="0.2000" Y="0.2333" />
                <FileData Type="Normal" Path="Default/common_roomowner_img.png" Plist="" />
              </AbstractNodeData>
              <AbstractNodeData Name="state_img" Visible="False" ActionTag="669382892" VisibleForFrame="False" Tag="1080" IconVisible="False" PositionPercentXEnabled="True" PositionPercentYEnabled="True" LeftMargin="19.5000" RightMargin="84.5000" TopMargin="41.0000" BottomMargin="113.0000" LeftEage="33" RightEage="33" TopEage="11" BottomEage="11" Scale9OriginX="-7" Scale9OriginY="11" Scale9Width="40" Scale9Height="4" ctype="ImageViewObjectData">
                <Size X="26.0000" Y="26.0000" />
                <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                <Position X="32.5000" Y="126.0000" />
                <Scale ScaleX="0.8000" ScaleY="0.8000" />
                <CColor A="255" R="255" G="255" B="255" />
                <PrePosition X="0.2500" Y="0.7000" />
                <PreSize X="0.2000" Y="0.1444" />
                <FileData Type="Normal" Path="GameRoomUI/state_online.png" Plist="" />
              </AbstractNodeData>
            </Children>
            <AnchorPoint ScaleY="0.5000" />
            <Position X="25.6000" Y="345.6000" />
            <Scale ScaleX="1.0000" ScaleY="1.0000" />
            <CColor A="255" R="255" G="255" B="255" />
            <PrePosition X="0.0200" Y="0.4800" />
            <PreSize X="0.1016" Y="0.2500" />
            <SingleColor A="255" R="0" G="0" B="0" />
            <FirstColor A="255" R="150" G="200" B="255" />
            <EndColor A="255" R="255" G="255" B="255" />
            <ColorVector ScaleY="1.0000" />
          </AbstractNodeData>
          <AbstractNodeData Name="pokers_panel2" ActionTag="535940381" VisibleForFrame="False" Tag="87" IconVisible="False" PositionPercentXEnabled="True" PositionPercentYEnabled="True" LeftMargin="153.6000" RightMargin="886.4000" TopMargin="261.6000" BottomMargin="218.4000" ClipAble="False" BackColorAlpha="102" ColorAngle="90.0000" Scale9Width="1" Scale9Height="1" ctype="PanelObjectData">
            <Size X="240.0000" Y="240.0000" />
            <Children>
              <AbstractNodeData Name="poker11_img" ActionTag="1402100432" Tag="88" IconVisible="False" LeftMargin="37.0000" RightMargin="117.0000" TopMargin="-8.0000" BottomMargin="128.0000" LeftEage="28" RightEage="28" TopEage="39" BottomEage="39" Scale9OriginX="28" Scale9OriginY="39" Scale9Width="30" Scale9Height="42" ctype="ImageViewObjectData">
                <Size X="86.0000" Y="120.0000" />
                <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                <Position X="80.0000" Y="188.0000" />
                <Scale ScaleX="1.0000" ScaleY="1.0000" />
                <CColor A="255" R="255" G="255" B="255" />
                <PrePosition X="0.3333" Y="0.7833" />
                <PreSize X="0.3583" Y="0.5000" />
                <FileData Type="MarkedSubImage" Path="Poker/10.png" Plist="Poker.plist" />
              </AbstractNodeData>
              <AbstractNodeData Name="poker12_img" ActionTag="921093053" Tag="89" IconVisible="False" LeftMargin="77.0000" RightMargin="77.0000" TopMargin="-8.0000" BottomMargin="128.0000" LeftEage="28" RightEage="28" TopEage="39" BottomEage="39" Scale9OriginX="28" Scale9OriginY="39" Scale9Width="30" Scale9Height="42" ctype="ImageViewObjectData">
                <Size X="86.0000" Y="120.0000" />
                <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                <Position X="120.0000" Y="188.0000" />
                <Scale ScaleX="1.0000" ScaleY="1.0000" />
                <CColor A="255" R="255" G="255" B="255" />
                <PrePosition X="0.5000" Y="0.7833" />
                <PreSize X="0.3583" Y="0.5000" />
                <FileData Type="MarkedSubImage" Path="Poker/11.png" Plist="Poker.plist" />
              </AbstractNodeData>
              <AbstractNodeData Name="poker13_img" ActionTag="-2037708528" Tag="90" IconVisible="False" LeftMargin="117.0000" RightMargin="37.0000" TopMargin="-8.0000" BottomMargin="128.0000" LeftEage="28" RightEage="28" TopEage="39" BottomEage="39" Scale9OriginX="28" Scale9OriginY="39" Scale9Width="30" Scale9Height="42" ctype="ImageViewObjectData">
                <Size X="86.0000" Y="120.0000" />
                <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                <Position X="160.0000" Y="188.0000" />
                <Scale ScaleX="1.0000" ScaleY="1.0000" />
                <CColor A="255" R="255" G="255" B="255" />
                <PrePosition X="0.6667" Y="0.7833" />
                <PreSize X="0.3583" Y="0.5000" />
                <FileData Type="MarkedSubImage" Path="Poker/12.png" Plist="Poker.plist" />
              </AbstractNodeData>
              <AbstractNodeData Name="poker21_img" ActionTag="803438927" Tag="91" IconVisible="False" LeftMargin="-3.0000" RightMargin="157.0000" TopMargin="56.0000" BottomMargin="64.0000" LeftEage="28" RightEage="28" TopEage="39" BottomEage="39" Scale9OriginX="28" Scale9OriginY="39" Scale9Width="30" Scale9Height="42" ctype="ImageViewObjectData">
                <Size X="86.0000" Y="120.0000" />
                <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                <Position X="40.0000" Y="124.0000" />
                <Scale ScaleX="1.0000" ScaleY="1.0000" />
                <CColor A="255" R="255" G="255" B="255" />
                <PrePosition X="0.1667" Y="0.5167" />
                <PreSize X="0.3583" Y="0.5000" />
                <FileData Type="MarkedSubImage" Path="Poker/13.png" Plist="Poker.plist" />
              </AbstractNodeData>
              <AbstractNodeData Name="poker22_img" ActionTag="1854950888" Tag="92" IconVisible="False" LeftMargin="37.0000" RightMargin="117.0000" TopMargin="56.0000" BottomMargin="64.0000" LeftEage="28" RightEage="28" TopEage="39" BottomEage="39" Scale9OriginX="28" Scale9OriginY="39" Scale9Width="30" Scale9Height="42" ctype="ImageViewObjectData">
                <Size X="86.0000" Y="120.0000" />
                <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                <Position X="80.0000" Y="124.0000" />
                <Scale ScaleX="1.0000" ScaleY="1.0000" />
                <CColor A="255" R="255" G="255" B="255" />
                <PrePosition X="0.3333" Y="0.5167" />
                <PreSize X="0.3583" Y="0.5000" />
                <FileData Type="MarkedSubImage" Path="Poker/14.png" Plist="Poker.plist" />
              </AbstractNodeData>
              <AbstractNodeData Name="poker23_img" ActionTag="1982764670" Tag="93" IconVisible="False" LeftMargin="77.0000" RightMargin="77.0000" TopMargin="56.0000" BottomMargin="64.0000" LeftEage="28" RightEage="28" TopEage="39" BottomEage="39" Scale9OriginX="28" Scale9OriginY="39" Scale9Width="30" Scale9Height="42" ctype="ImageViewObjectData">
                <Size X="86.0000" Y="120.0000" />
                <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                <Position X="120.0000" Y="124.0000" />
                <Scale ScaleX="1.0000" ScaleY="1.0000" />
                <CColor A="255" R="255" G="255" B="255" />
                <PrePosition X="0.5000" Y="0.5167" />
                <PreSize X="0.3583" Y="0.5000" />
                <FileData Type="MarkedSubImage" Path="Poker/20.png" Plist="Poker.plist" />
              </AbstractNodeData>
              <AbstractNodeData Name="poker24_img" ActionTag="-1703440425" Tag="94" IconVisible="False" LeftMargin="117.0000" RightMargin="37.0000" TopMargin="56.0000" BottomMargin="64.0000" LeftEage="28" RightEage="28" TopEage="39" BottomEage="39" Scale9OriginX="28" Scale9OriginY="39" Scale9Width="30" Scale9Height="42" ctype="ImageViewObjectData">
                <Size X="86.0000" Y="120.0000" />
                <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                <Position X="160.0000" Y="124.0000" />
                <Scale ScaleX="1.0000" ScaleY="1.0000" />
                <CColor A="255" R="255" G="255" B="255" />
                <PrePosition X="0.6667" Y="0.5167" />
                <PreSize X="0.3583" Y="0.5000" />
                <FileData Type="MarkedSubImage" Path="Poker/23.png" Plist="Poker.plist" />
              </AbstractNodeData>
              <AbstractNodeData Name="poker25_img" ActionTag="-250656248" Tag="95" IconVisible="False" LeftMargin="157.0000" RightMargin="-3.0000" TopMargin="56.0000" BottomMargin="64.0000" LeftEage="28" RightEage="28" TopEage="39" BottomEage="39" Scale9OriginX="28" Scale9OriginY="39" Scale9Width="30" Scale9Height="42" ctype="ImageViewObjectData">
                <Size X="86.0000" Y="120.0000" />
                <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                <Position X="200.0000" Y="124.0000" />
                <Scale ScaleX="1.0000" ScaleY="1.0000" />
                <CColor A="255" R="255" G="255" B="255" />
                <PrePosition X="0.8333" Y="0.5167" />
                <PreSize X="0.3583" Y="0.5000" />
                <FileData Type="MarkedSubImage" Path="Poker/26.png" Plist="Poker.plist" />
              </AbstractNodeData>
              <AbstractNodeData Name="poker31_img" ActionTag="2129568900" Tag="96" IconVisible="False" LeftMargin="-3.0000" RightMargin="157.0000" TopMargin="120.0000" LeftEage="28" RightEage="28" TopEage="39" BottomEage="39" Scale9OriginX="28" Scale9OriginY="39" Scale9Width="30" Scale9Height="42" ctype="ImageViewObjectData">
                <Size X="86.0000" Y="120.0000" />
                <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                <Position X="40.0000" Y="60.0000" />
                <Scale ScaleX="1.0000" ScaleY="1.0000" />
                <CColor A="255" R="255" G="255" B="255" />
                <PrePosition X="0.1667" Y="0.2500" />
                <PreSize X="0.3583" Y="0.5000" />
                <FileData Type="MarkedSubImage" Path="Poker/29.png" Plist="Poker.plist" />
              </AbstractNodeData>
              <AbstractNodeData Name="poker32_img" ActionTag="42627742" Tag="97" IconVisible="False" LeftMargin="37.0000" RightMargin="117.0000" TopMargin="120.0000" LeftEage="28" RightEage="28" TopEage="39" BottomEage="39" Scale9OriginX="28" Scale9OriginY="39" Scale9Width="30" Scale9Height="42" ctype="ImageViewObjectData">
                <Size X="86.0000" Y="120.0000" />
                <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                <Position X="80.0000" Y="60.0000" />
                <Scale ScaleX="1.0000" ScaleY="1.0000" />
                <CColor A="255" R="255" G="255" B="255" />
                <PrePosition X="0.3333" Y="0.2500" />
                <PreSize X="0.3583" Y="0.5000" />
                <FileData Type="MarkedSubImage" Path="Poker/34.png" Plist="Poker.plist" />
              </AbstractNodeData>
              <AbstractNodeData Name="poker33_img" ActionTag="699999127" Tag="98" IconVisible="False" LeftMargin="77.0000" RightMargin="77.0000" TopMargin="120.0000" LeftEage="28" RightEage="28" TopEage="39" BottomEage="39" Scale9OriginX="28" Scale9OriginY="39" Scale9Width="30" Scale9Height="42" ctype="ImageViewObjectData">
                <Size X="86.0000" Y="120.0000" />
                <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                <Position X="120.0000" Y="60.0000" />
                <Scale ScaleX="1.0000" ScaleY="1.0000" />
                <CColor A="255" R="255" G="255" B="255" />
                <PrePosition X="0.5000" Y="0.2500" />
                <PreSize X="0.3583" Y="0.5000" />
                <FileData Type="MarkedSubImage" Path="Poker/37.png" Plist="Poker.plist" />
              </AbstractNodeData>
              <AbstractNodeData Name="poker34_img" ActionTag="-1374765301" Tag="99" IconVisible="False" LeftMargin="117.0000" RightMargin="37.0000" TopMargin="120.0000" LeftEage="28" RightEage="28" TopEage="39" BottomEage="39" Scale9OriginX="28" Scale9OriginY="39" Scale9Width="30" Scale9Height="42" ctype="ImageViewObjectData">
                <Size X="86.0000" Y="120.0000" />
                <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                <Position X="160.0000" Y="60.0000" />
                <Scale ScaleX="1.0000" ScaleY="1.0000" />
                <CColor A="255" R="255" G="255" B="255" />
                <PrePosition X="0.6667" Y="0.2500" />
                <PreSize X="0.3583" Y="0.5000" />
                <FileData Type="MarkedSubImage" Path="Poker/42.png" Plist="Poker.plist" />
              </AbstractNodeData>
              <AbstractNodeData Name="poker35_img" ActionTag="1911102954" Tag="100" IconVisible="False" LeftMargin="157.0000" RightMargin="-3.0000" TopMargin="120.0000" LeftEage="28" RightEage="28" TopEage="39" BottomEage="39" Scale9OriginX="28" Scale9OriginY="39" Scale9Width="30" Scale9Height="42" ctype="ImageViewObjectData">
                <Size X="86.0000" Y="120.0000" />
                <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                <Position X="200.0000" Y="60.0000" />
                <Scale ScaleX="1.0000" ScaleY="1.0000" />
                <CColor A="255" R="255" G="255" B="255" />
                <PrePosition X="0.8333" Y="0.2500" />
                <PreSize X="0.3583" Y="0.5000" />
                <FileData Type="MarkedSubImage" Path="Poker/44.png" Plist="Poker.plist" />
              </AbstractNodeData>
              <AbstractNodeData Name="toudun_result_img" ActionTag="-1403672703" Tag="101" IconVisible="False" LeftMargin="240.0000" RightMargin="-145.0000" TopMargin="-11.0000" BottomMargin="188.0000" LeftEage="47" RightEage="47" TopEage="20" BottomEage="20" Scale9OriginX="47" Scale9OriginY="20" Scale9Width="51" Scale9Height="23" ctype="ImageViewObjectData">
                <Size X="145.0000" Y="63.0000" />
                <AnchorPoint />
                <Position X="240.0000" Y="188.0000" />
                <Scale ScaleX="1.0000" ScaleY="1.0000" />
                <CColor A="255" R="255" G="255" B="255" />
                <PrePosition X="1.0000" Y="0.7833" />
                <PreSize X="0.6042" Y="0.2625" />
                <FileData Type="Normal" Path="Poker/paixing_duizi.png" Plist="" />
              </AbstractNodeData>
              <AbstractNodeData Name="zhongdun_result_img" ActionTag="353663809" Tag="102" IconVisible="False" LeftMargin="240.0000" RightMargin="-145.0000" TopMargin="59.0000" BottomMargin="118.0000" LeftEage="47" RightEage="47" TopEage="20" BottomEage="20" Scale9OriginX="47" Scale9OriginY="20" Scale9Width="51" Scale9Height="23" ctype="ImageViewObjectData">
                <Size X="145.0000" Y="63.0000" />
                <AnchorPoint />
                <Position X="240.0000" Y="118.0000" />
                <Scale ScaleX="1.0000" ScaleY="1.0000" />
                <CColor A="255" R="255" G="255" B="255" />
                <PrePosition X="1.0000" Y="0.4917" />
                <PreSize X="0.6042" Y="0.2625" />
                <FileData Type="Normal" Path="Poker/paixing_liangdui.png" Plist="" />
              </AbstractNodeData>
              <AbstractNodeData Name="weidun_result_img" ActionTag="743351401" Tag="103" IconVisible="False" LeftMargin="240.0000" RightMargin="-145.0000" TopMargin="129.0000" BottomMargin="48.0000" LeftEage="28" RightEage="28" TopEage="20" BottomEage="20" Scale9OriginX="28" Scale9OriginY="20" Scale9Width="89" Scale9Height="23" ctype="ImageViewObjectData">
                <Size X="145.0000" Y="63.0000" />
                <AnchorPoint />
                <Position X="240.0000" Y="48.0000" />
                <Scale ScaleX="1.0000" ScaleY="1.0000" />
                <CColor A="255" R="255" G="255" B="255" />
                <PrePosition X="1.0000" Y="0.2000" />
                <PreSize X="0.6042" Y="0.2625" />
                <FileData Type="Normal" Path="Poker/paixing_shunzi.png" Plist="" />
              </AbstractNodeData>
            </Children>
            <AnchorPoint ScaleY="0.5000" />
            <Position X="153.6000" Y="338.4000" />
            <Scale ScaleX="0.9000" ScaleY="0.9000" />
            <CColor A="255" R="255" G="255" B="255" />
            <PrePosition X="0.1200" Y="0.4700" />
            <PreSize X="0.1875" Y="0.3333" />
            <SingleColor A="255" R="150" G="200" B="255" />
            <FirstColor A="255" R="150" G="200" B="255" />
            <EndColor A="255" R="255" G="255" B="255" />
            <ColorVector ScaleY="1.0000" />
          </AbstractNodeData>
          <AbstractNodeData Name="player_info_panel3" ActionTag="-540563895" VisibleForFrame="False" Tag="1061" IconVisible="False" PositionPercentXEnabled="True" PositionPercentYEnabled="True" LeftMargin="1124.4000" RightMargin="25.6000" TopMargin="284.4000" BottomMargin="255.6000" ClipAble="False" BackColorAlpha="127" ColorAngle="90.0000" Scale9Width="1" Scale9Height="1" ctype="PanelObjectData">
            <Size X="130.0000" Y="180.0000" />
            <Children>
              <AbstractNodeData Name="name_bg" ActionTag="-2014061049" Tag="1062" IconVisible="False" PositionPercentXEnabled="True" PositionPercentYEnabled="True" LeftMargin="19.6620" RightMargin="20.3380" TopMargin="105.2860" BottomMargin="46.7140" LeftEage="34" RightEage="34" TopEage="9" BottomEage="9" Scale9OriginX="34" Scale9OriginY="9" Scale9Width="22" Scale9Height="10" ctype="ImageViewObjectData">
                <Size X="90.0000" Y="28.0000" />
                <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                <Position X="64.6620" Y="60.7140" />
                <Scale ScaleX="1.0000" ScaleY="1.0000" />
                <CColor A="255" R="255" G="255" B="255" />
                <PrePosition X="0.4974" Y="0.3373" />
                <PreSize X="0.6923" Y="0.1556" />
                <FileData Type="Normal" Path="Default/name_bg.png" Plist="" />
              </AbstractNodeData>
              <AbstractNodeData Name="portrait_sprite" ActionTag="-2035125432" VisibleForFrame="False" Tag="1063" IconVisible="False" PositionPercentXEnabled="True" PositionPercentYEnabled="True" LeftMargin="40.0000" RightMargin="40.0000" TopMargin="65.0000" BottomMargin="65.0000" ctype="SpriteObjectData">
                <Size X="50.0000" Y="50.0000" />
                <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                <Position X="65.0000" Y="90.0000" />
                <Scale ScaleX="1.4500" ScaleY="1.4500" />
                <CColor A="255" R="255" G="255" B="255" />
                <PrePosition X="0.5000" Y="0.5000" />
                <PreSize X="0.3846" Y="0.2778" />
                <FileData Type="Normal" Path="Default/common_portrait_mask.png" Plist="" />
                <BlendFunc Src="1" Dst="771" />
              </AbstractNodeData>
              <AbstractNodeData Name="frame_img" ActionTag="-2025625041" Tag="1064" IconVisible="False" PositionPercentXEnabled="True" PositionPercentYEnabled="True" LeftMargin="19.0000" RightMargin="19.0000" TopMargin="43.0000" BottomMargin="43.0000" TouchEnable="True" LeftEage="24" RightEage="24" TopEage="24" BottomEage="24" Scale9OriginX="24" Scale9OriginY="24" Scale9Width="44" Scale9Height="46" ctype="ImageViewObjectData">
                <Size X="92.0000" Y="94.0000" />
                <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                <Position X="65.0000" Y="90.0000" />
                <Scale ScaleX="1.0000" ScaleY="1.0000" />
                <CColor A="255" R="255" G="255" B="255" />
                <PrePosition X="0.5000" Y="0.5000" />
                <PreSize X="0.7077" Y="0.5222" />
                <FileData Type="Normal" Path="Default/common_portrait_frame3.png" Plist="" />
              </AbstractNodeData>
              <AbstractNodeData Name="name_label" ActionTag="-1072720884" Tag="1065" IconVisible="False" PositionPercentXEnabled="True" PositionPercentYEnabled="True" LeftMargin="-5.0000" RightMargin="-5.0000" TopMargin="112.4000" BottomMargin="47.6000" IsCustomSize="True" FontSize="16" LabelText="我我我我我我我" HorizontalAlignmentType="HT_Center" ShadowOffsetX="2.0000" ShadowOffsetY="-2.0000" ctype="TextObjectData">
                <Size X="140.0000" Y="20.0000" />
                <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                <Position X="65.0000" Y="57.6000" />
                <Scale ScaleX="1.0000" ScaleY="1.0000" />
                <CColor A="255" R="190" G="232" B="255" />
                <PrePosition X="0.5000" Y="0.3200" />
                <PreSize X="1.0769" Y="0.1111" />
                <FontResource Type="Normal" Path="font/zhunyuan.ttf" Plist="" />
                <OutlineColor A="255" R="255" G="0" B="0" />
                <ShadowColor A="255" R="110" G="110" B="110" />
              </AbstractNodeData>
              <AbstractNodeData Name="score_img" ActionTag="1239800431" Tag="1066" IconVisible="False" PositionPercentXEnabled="True" PositionPercentYEnabled="True" LeftMargin="21.0020" RightMargin="16.9980" TopMargin="137.8960" BottomMargin="11.1040" LeftEage="45" RightEage="45" TopEage="13" BottomEage="13" Scale9OriginX="45" Scale9OriginY="13" Scale9Width="2" Scale9Height="5" ctype="ImageViewObjectData">
                <Size X="92.0000" Y="31.0000" />
                <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                <Position X="67.0020" Y="26.6040" />
                <Scale ScaleX="1.0000" ScaleY="1.0000" />
                <CColor A="255" R="255" G="255" B="255" />
                <PrePosition X="0.5154" Y="0.1478" />
                <PreSize X="0.7077" Y="0.1722" />
                <FileData Type="Normal" Path="Default/score_bg2.png" Plist="" />
              </AbstractNodeData>
              <AbstractNodeData Name="score_label" ActionTag="-143431268" Tag="1067" IconVisible="False" PositionPercentXEnabled="True" PositionPercentYEnabled="True" LeftMargin="7.6000" RightMargin="2.4000" TopMargin="141.9020" BottomMargin="18.0980" IsCustomSize="True" FontSize="20" LabelText="0&#xA;" HorizontalAlignmentType="HT_Center" ShadowOffsetX="2.0000" ShadowOffsetY="-2.0000" ctype="TextObjectData">
                <Size X="120.0000" Y="20.0000" />
                <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                <Position X="67.6000" Y="28.0980" />
                <Scale ScaleX="1.0000" ScaleY="1.0000" />
                <CColor A="255" R="199" G="165" B="66" />
                <PrePosition X="0.5200" Y="0.1561" />
                <PreSize X="0.9231" Y="0.1111" />
                <FontResource Type="Normal" Path="font/zhunyuan.ttf" Plist="" />
                <OutlineColor A="255" R="255" G="0" B="0" />
                <ShadowColor A="255" R="110" G="110" B="110" />
              </AbstractNodeData>
              <AbstractNodeData Name="game_state_img" ActionTag="-425887230" VisibleForFrame="False" Tag="1017" IconVisible="False" PositionPercentXEnabled="True" PositionPercentYEnabled="True" LeftMargin="14.0000" RightMargin="14.0000" TopMargin="70.5000" BottomMargin="70.5000" LeftEage="15" RightEage="15" TopEage="10" BottomEage="10" Scale9OriginX="15" Scale9OriginY="10" Scale9Width="72" Scale9Height="19" ctype="ImageViewObjectData">
                <Size X="102.0000" Y="39.0000" />
                <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                <Position X="65.0000" Y="90.0000" />
                <Scale ScaleX="1.0000" ScaleY="1.0000" />
                <CColor A="255" R="255" G="255" B="255" />
                <PrePosition X="0.5000" Y="0.5000" />
                <PreSize X="0.7846" Y="0.2167" />
                <FileData Type="Normal" Path="GameRoomUI/state_wancheng.png" Plist="" />
              </AbstractNodeData>
              <AbstractNodeData Name="owner_img" ActionTag="112339293" Tag="1069" IconVisible="False" PositionPercentXEnabled="True" PositionPercentYEnabled="True" LeftMargin="80.6000" RightMargin="23.4000" TopMargin="45.6000" BottomMargin="92.4000" LeftEage="21" RightEage="21" TopEage="34" BottomEage="34" Scale9OriginX="5" Scale9OriginY="8" Scale9Width="16" Scale9Height="26" ctype="ImageViewObjectData">
                <Size X="26.0000" Y="42.0000" />
                <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                <Position X="93.6000" Y="113.4000" />
                <Scale ScaleX="1.1000" ScaleY="1.1000" />
                <CColor A="255" R="255" G="255" B="255" />
                <PrePosition X="0.7200" Y="0.6300" />
                <PreSize X="0.2000" Y="0.2333" />
                <FileData Type="Normal" Path="Default/common_roomowner_img.png" Plist="" />
              </AbstractNodeData>
              <AbstractNodeData Name="state_img" Visible="False" ActionTag="634667385" VisibleForFrame="False" Tag="1070" IconVisible="False" PositionPercentXEnabled="True" PositionPercentYEnabled="True" LeftMargin="19.5000" RightMargin="84.5000" TopMargin="41.0000" BottomMargin="113.0000" LeftEage="33" RightEage="33" TopEage="11" BottomEage="11" Scale9OriginX="-7" Scale9OriginY="11" Scale9Width="40" Scale9Height="4" ctype="ImageViewObjectData">
                <Size X="26.0000" Y="26.0000" />
                <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                <Position X="32.5000" Y="126.0000" />
                <Scale ScaleX="0.8000" ScaleY="0.8000" />
                <CColor A="255" R="255" G="255" B="255" />
                <PrePosition X="0.2500" Y="0.7000" />
                <PreSize X="0.2000" Y="0.1444" />
                <FileData Type="Normal" Path="GameRoomUI/state_online.png" Plist="" />
              </AbstractNodeData>
            </Children>
            <AnchorPoint ScaleX="1.0000" ScaleY="0.5000" />
            <Position X="1254.4000" Y="345.6000" />
            <Scale ScaleX="1.0000" ScaleY="1.0000" />
            <CColor A="255" R="255" G="255" B="255" />
            <PrePosition X="0.9800" Y="0.4800" />
            <PreSize X="0.1016" Y="0.2500" />
            <SingleColor A="255" R="0" G="0" B="0" />
            <FirstColor A="255" R="150" G="200" B="255" />
            <EndColor A="255" R="255" G="255" B="255" />
            <ColorVector ScaleY="1.0000" />
          </AbstractNodeData>
          <AbstractNodeData Name="pokers_panel3" ActionTag="920924016" VisibleForFrame="False" Tag="104" IconVisible="False" PositionPercentXEnabled="True" PositionPercentYEnabled="True" LeftMargin="886.4000" RightMargin="153.6000" TopMargin="261.6000" BottomMargin="218.4000" ClipAble="False" BackColorAlpha="102" ColorAngle="90.0000" Scale9Width="1" Scale9Height="1" ctype="PanelObjectData">
            <Size X="240.0000" Y="240.0000" />
            <Children>
              <AbstractNodeData Name="poker11_img" ActionTag="1778696271" Tag="105" IconVisible="False" LeftMargin="37.0000" RightMargin="117.0000" TopMargin="-8.0000" BottomMargin="128.0000" LeftEage="28" RightEage="28" TopEage="39" BottomEage="39" Scale9OriginX="28" Scale9OriginY="39" Scale9Width="30" Scale9Height="42" ctype="ImageViewObjectData">
                <Size X="86.0000" Y="120.0000" />
                <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                <Position X="80.0000" Y="188.0000" />
                <Scale ScaleX="1.0000" ScaleY="1.0000" />
                <CColor A="255" R="255" G="255" B="255" />
                <PrePosition X="0.3333" Y="0.7833" />
                <PreSize X="0.3583" Y="0.5000" />
                <FileData Type="MarkedSubImage" Path="Poker/10.png" Plist="Poker.plist" />
              </AbstractNodeData>
              <AbstractNodeData Name="poker12_img" ActionTag="289798999" Tag="106" IconVisible="False" LeftMargin="77.0000" RightMargin="77.0000" TopMargin="-8.0000" BottomMargin="128.0000" LeftEage="28" RightEage="28" TopEage="39" BottomEage="39" Scale9OriginX="28" Scale9OriginY="39" Scale9Width="30" Scale9Height="42" ctype="ImageViewObjectData">
                <Size X="86.0000" Y="120.0000" />
                <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                <Position X="120.0000" Y="188.0000" />
                <Scale ScaleX="1.0000" ScaleY="1.0000" />
                <CColor A="255" R="255" G="255" B="255" />
                <PrePosition X="0.5000" Y="0.7833" />
                <PreSize X="0.3583" Y="0.5000" />
                <FileData Type="MarkedSubImage" Path="Poker/11.png" Plist="Poker.plist" />
              </AbstractNodeData>
              <AbstractNodeData Name="poker13_img" ActionTag="1373883795" Tag="107" IconVisible="False" LeftMargin="117.0000" RightMargin="37.0000" TopMargin="-8.0000" BottomMargin="128.0000" LeftEage="28" RightEage="28" TopEage="39" BottomEage="39" Scale9OriginX="28" Scale9OriginY="39" Scale9Width="30" Scale9Height="42" ctype="ImageViewObjectData">
                <Size X="86.0000" Y="120.0000" />
                <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                <Position X="160.0000" Y="188.0000" />
                <Scale ScaleX="1.0000" ScaleY="1.0000" />
                <CColor A="255" R="255" G="255" B="255" />
                <PrePosition X="0.6667" Y="0.7833" />
                <PreSize X="0.3583" Y="0.5000" />
                <FileData Type="MarkedSubImage" Path="Poker/12.png" Plist="Poker.plist" />
              </AbstractNodeData>
              <AbstractNodeData Name="poker21_img" ActionTag="-2111543114" Tag="108" IconVisible="False" LeftMargin="-3.0000" RightMargin="157.0000" TopMargin="56.0000" BottomMargin="64.0000" LeftEage="28" RightEage="28" TopEage="39" BottomEage="39" Scale9OriginX="28" Scale9OriginY="39" Scale9Width="30" Scale9Height="42" ctype="ImageViewObjectData">
                <Size X="86.0000" Y="120.0000" />
                <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                <Position X="40.0000" Y="124.0000" />
                <Scale ScaleX="1.0000" ScaleY="1.0000" />
                <CColor A="255" R="255" G="255" B="255" />
                <PrePosition X="0.1667" Y="0.5167" />
                <PreSize X="0.3583" Y="0.5000" />
                <FileData Type="MarkedSubImage" Path="Poker/13.png" Plist="Poker.plist" />
              </AbstractNodeData>
              <AbstractNodeData Name="poker22_img" ActionTag="636347157" Tag="109" IconVisible="False" LeftMargin="37.0000" RightMargin="117.0000" TopMargin="56.0000" BottomMargin="64.0000" LeftEage="28" RightEage="28" TopEage="39" BottomEage="39" Scale9OriginX="28" Scale9OriginY="39" Scale9Width="30" Scale9Height="42" ctype="ImageViewObjectData">
                <Size X="86.0000" Y="120.0000" />
                <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                <Position X="80.0000" Y="124.0000" />
                <Scale ScaleX="1.0000" ScaleY="1.0000" />
                <CColor A="255" R="255" G="255" B="255" />
                <PrePosition X="0.3333" Y="0.5167" />
                <PreSize X="0.3583" Y="0.5000" />
                <FileData Type="MarkedSubImage" Path="Poker/14.png" Plist="Poker.plist" />
              </AbstractNodeData>
              <AbstractNodeData Name="poker23_img" ActionTag="669183387" Tag="110" IconVisible="False" LeftMargin="77.0000" RightMargin="77.0000" TopMargin="56.0000" BottomMargin="64.0000" LeftEage="28" RightEage="28" TopEage="39" BottomEage="39" Scale9OriginX="28" Scale9OriginY="39" Scale9Width="30" Scale9Height="42" ctype="ImageViewObjectData">
                <Size X="86.0000" Y="120.0000" />
                <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                <Position X="120.0000" Y="124.0000" />
                <Scale ScaleX="1.0000" ScaleY="1.0000" />
                <CColor A="255" R="255" G="255" B="255" />
                <PrePosition X="0.5000" Y="0.5167" />
                <PreSize X="0.3583" Y="0.5000" />
                <FileData Type="MarkedSubImage" Path="Poker/20.png" Plist="Poker.plist" />
              </AbstractNodeData>
              <AbstractNodeData Name="poker24_img" ActionTag="575449981" Tag="111" IconVisible="False" LeftMargin="117.0000" RightMargin="37.0000" TopMargin="56.0000" BottomMargin="64.0000" LeftEage="28" RightEage="28" TopEage="39" BottomEage="39" Scale9OriginX="28" Scale9OriginY="39" Scale9Width="30" Scale9Height="42" ctype="ImageViewObjectData">
                <Size X="86.0000" Y="120.0000" />
                <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                <Position X="160.0000" Y="124.0000" />
                <Scale ScaleX="1.0000" ScaleY="1.0000" />
                <CColor A="255" R="255" G="255" B="255" />
                <PrePosition X="0.6667" Y="0.5167" />
                <PreSize X="0.3583" Y="0.5000" />
                <FileData Type="MarkedSubImage" Path="Poker/23.png" Plist="Poker.plist" />
              </AbstractNodeData>
              <AbstractNodeData Name="poker25_img" ActionTag="427174614" Tag="112" IconVisible="False" LeftMargin="157.0000" RightMargin="-3.0000" TopMargin="56.0000" BottomMargin="64.0000" LeftEage="28" RightEage="28" TopEage="39" BottomEage="39" Scale9OriginX="28" Scale9OriginY="39" Scale9Width="30" Scale9Height="42" ctype="ImageViewObjectData">
                <Size X="86.0000" Y="120.0000" />
                <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                <Position X="200.0000" Y="124.0000" />
                <Scale ScaleX="1.0000" ScaleY="1.0000" />
                <CColor A="255" R="255" G="255" B="255" />
                <PrePosition X="0.8333" Y="0.5167" />
                <PreSize X="0.3583" Y="0.5000" />
                <FileData Type="MarkedSubImage" Path="Poker/26.png" Plist="Poker.plist" />
              </AbstractNodeData>
              <AbstractNodeData Name="poker31_img" ActionTag="-663149270" Tag="113" IconVisible="False" LeftMargin="-3.0000" RightMargin="157.0000" TopMargin="120.0000" LeftEage="28" RightEage="28" TopEage="39" BottomEage="39" Scale9OriginX="28" Scale9OriginY="39" Scale9Width="30" Scale9Height="42" ctype="ImageViewObjectData">
                <Size X="86.0000" Y="120.0000" />
                <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                <Position X="40.0000" Y="60.0000" />
                <Scale ScaleX="1.0000" ScaleY="1.0000" />
                <CColor A="255" R="255" G="255" B="255" />
                <PrePosition X="0.1667" Y="0.2500" />
                <PreSize X="0.3583" Y="0.5000" />
                <FileData Type="MarkedSubImage" Path="Poker/29.png" Plist="Poker.plist" />
              </AbstractNodeData>
              <AbstractNodeData Name="poker32_img" ActionTag="741183475" Tag="114" IconVisible="False" LeftMargin="37.0000" RightMargin="117.0000" TopMargin="120.0000" LeftEage="28" RightEage="28" TopEage="39" BottomEage="39" Scale9OriginX="28" Scale9OriginY="39" Scale9Width="30" Scale9Height="42" ctype="ImageViewObjectData">
                <Size X="86.0000" Y="120.0000" />
                <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                <Position X="80.0000" Y="60.0000" />
                <Scale ScaleX="1.0000" ScaleY="1.0000" />
                <CColor A="255" R="255" G="255" B="255" />
                <PrePosition X="0.3333" Y="0.2500" />
                <PreSize X="0.3583" Y="0.5000" />
                <FileData Type="MarkedSubImage" Path="Poker/34.png" Plist="Poker.plist" />
              </AbstractNodeData>
              <AbstractNodeData Name="poker33_img" ActionTag="1278068529" Tag="115" IconVisible="False" LeftMargin="77.0000" RightMargin="77.0000" TopMargin="120.0000" LeftEage="28" RightEage="28" TopEage="39" BottomEage="39" Scale9OriginX="28" Scale9OriginY="39" Scale9Width="30" Scale9Height="42" ctype="ImageViewObjectData">
                <Size X="86.0000" Y="120.0000" />
                <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                <Position X="120.0000" Y="60.0000" />
                <Scale ScaleX="1.0000" ScaleY="1.0000" />
                <CColor A="255" R="255" G="255" B="255" />
                <PrePosition X="0.5000" Y="0.2500" />
                <PreSize X="0.3583" Y="0.5000" />
                <FileData Type="MarkedSubImage" Path="Poker/37.png" Plist="Poker.plist" />
              </AbstractNodeData>
              <AbstractNodeData Name="poker34_img" ActionTag="-336168651" Tag="116" IconVisible="False" LeftMargin="117.0000" RightMargin="37.0000" TopMargin="120.0000" LeftEage="28" RightEage="28" TopEage="39" BottomEage="39" Scale9OriginX="28" Scale9OriginY="39" Scale9Width="30" Scale9Height="42" ctype="ImageViewObjectData">
                <Size X="86.0000" Y="120.0000" />
                <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                <Position X="160.0000" Y="60.0000" />
                <Scale ScaleX="1.0000" ScaleY="1.0000" />
                <CColor A="255" R="255" G="255" B="255" />
                <PrePosition X="0.6667" Y="0.2500" />
                <PreSize X="0.3583" Y="0.5000" />
                <FileData Type="MarkedSubImage" Path="Poker/42.png" Plist="Poker.plist" />
              </AbstractNodeData>
              <AbstractNodeData Name="poker35_img" ActionTag="-552015331" Tag="117" IconVisible="False" LeftMargin="157.0000" RightMargin="-3.0000" TopMargin="120.0000" LeftEage="28" RightEage="28" TopEage="39" BottomEage="39" Scale9OriginX="28" Scale9OriginY="39" Scale9Width="30" Scale9Height="42" ctype="ImageViewObjectData">
                <Size X="86.0000" Y="120.0000" />
                <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                <Position X="200.0000" Y="60.0000" />
                <Scale ScaleX="1.0000" ScaleY="1.0000" />
                <CColor A="255" R="255" G="255" B="255" />
                <PrePosition X="0.8333" Y="0.2500" />
                <PreSize X="0.3583" Y="0.5000" />
                <FileData Type="MarkedSubImage" Path="Poker/44.png" Plist="Poker.plist" />
              </AbstractNodeData>
              <AbstractNodeData Name="toudun_result_img" ActionTag="744263130" Tag="118" IconVisible="False" LeftMargin="-145.0000" RightMargin="240.0000" TopMargin="-11.0000" BottomMargin="188.0000" LeftEage="47" RightEage="47" TopEage="20" BottomEage="20" Scale9OriginX="47" Scale9OriginY="20" Scale9Width="51" Scale9Height="23" ctype="ImageViewObjectData">
                <Size X="145.0000" Y="63.0000" />
                <AnchorPoint ScaleX="1.0000" />
                <Position Y="188.0000" />
                <Scale ScaleX="1.0000" ScaleY="1.0000" />
                <CColor A="255" R="255" G="255" B="255" />
                <PrePosition Y="0.7833" />
                <PreSize X="0.6042" Y="0.2625" />
                <FileData Type="Normal" Path="Poker/paixing_duizi.png" Plist="" />
              </AbstractNodeData>
              <AbstractNodeData Name="zhongdun_result_img" ActionTag="1371247301" Tag="119" IconVisible="False" LeftMargin="-145.0000" RightMargin="240.0000" TopMargin="59.0000" BottomMargin="118.0000" LeftEage="47" RightEage="47" TopEage="20" BottomEage="20" Scale9OriginX="47" Scale9OriginY="20" Scale9Width="51" Scale9Height="23" ctype="ImageViewObjectData">
                <Size X="145.0000" Y="63.0000" />
                <AnchorPoint ScaleX="1.0000" />
                <Position Y="118.0000" />
                <Scale ScaleX="1.0000" ScaleY="1.0000" />
                <CColor A="255" R="255" G="255" B="255" />
                <PrePosition Y="0.4917" />
                <PreSize X="0.6042" Y="0.2625" />
                <FileData Type="Normal" Path="Poker/paixing_liangdui.png" Plist="" />
              </AbstractNodeData>
              <AbstractNodeData Name="weidun_result_img" ActionTag="-1071806660" Tag="120" IconVisible="False" LeftMargin="-145.0000" RightMargin="240.0000" TopMargin="129.0000" BottomMargin="48.0000" LeftEage="28" RightEage="28" TopEage="20" BottomEage="20" Scale9OriginX="28" Scale9OriginY="20" Scale9Width="89" Scale9Height="23" ctype="ImageViewObjectData">
                <Size X="145.0000" Y="63.0000" />
                <AnchorPoint ScaleX="1.0000" />
                <Position Y="48.0000" />
                <Scale ScaleX="1.0000" ScaleY="1.0000" />
                <CColor A="255" R="255" G="255" B="255" />
                <PrePosition Y="0.2000" />
                <PreSize X="0.6042" Y="0.2625" />
                <FileData Type="Normal" Path="Poker/paixing_shunzi.png" Plist="" />
              </AbstractNodeData>
            </Children>
            <AnchorPoint ScaleX="1.0000" ScaleY="0.5000" />
            <Position X="1126.4000" Y="338.4000" />
            <Scale ScaleX="0.9000" ScaleY="0.9000" />
            <CColor A="255" R="255" G="255" B="255" />
            <PrePosition X="0.8800" Y="0.4700" />
            <PreSize X="0.1875" Y="0.3333" />
            <SingleColor A="255" R="150" G="200" B="255" />
            <FirstColor A="255" R="150" G="200" B="255" />
            <EndColor A="255" R="255" G="255" B="255" />
            <ColorVector ScaleY="1.0000" />
          </AbstractNodeData>
          <AbstractNodeData Name="poker_node0" ActionTag="-1877493239" Tag="537" IconVisible="True" PositionPercentXEnabled="True" PositionPercentYEnabled="True" LeftMargin="510.0000" RightMargin="770.0000" TopMargin="670.0320" BottomMargin="49.9680" StretchWidthEnable="False" StretchHeightEnable="False" InnerActionSpeed="1.0000" CustomSizeEnabled="False" ctype="ProjectNodeObjectData">
            <Size X="0.0000" Y="0.0000" />
            <AnchorPoint />
            <Position X="510.0000" Y="49.9680" />
            <Scale ScaleX="1.0000" ScaleY="1.0000" />
            <CColor A="255" R="255" G="255" B="255" />
            <PrePosition X="0.3984" Y="0.0694" />
            <PreSize X="0.0000" Y="0.0000" />
            <FileData Type="Normal" Path="PokerNode.csd" Plist="" />
          </AbstractNodeData>
          <AbstractNodeData Name="poker_node1" ActionTag="-157304189" Tag="567" IconVisible="True" PositionPercentXEnabled="True" PositionPercentYEnabled="True" LeftMargin="329.9840" RightMargin="950.0160" TopMargin="214.9920" BottomMargin="505.0080" StretchWidthEnable="False" StretchHeightEnable="False" InnerActionSpeed="1.0000" CustomSizeEnabled="False" ctype="ProjectNodeObjectData">
            <Size X="0.0000" Y="0.0000" />
            <AnchorPoint />
            <Position X="329.9840" Y="505.0080" />
            <Scale ScaleX="1.0000" ScaleY="1.0000" />
            <CColor A="255" R="255" G="255" B="255" />
            <PrePosition X="0.2578" Y="0.7014" />
            <PreSize X="0.0000" Y="0.0000" />
            <FileData Type="Normal" Path="PokerNode.csd" Plist="" />
          </AbstractNodeData>
          <AbstractNodeData Name="poker_node2" ActionTag="752685631" Tag="522" IconVisible="True" PositionPercentXEnabled="True" PositionPercentYEnabled="True" LeftMargin="160.0000" RightMargin="1120.0000" TopMargin="455.0000" BottomMargin="265.0000" StretchWidthEnable="False" StretchHeightEnable="False" InnerActionSpeed="1.0000" CustomSizeEnabled="False" ctype="ProjectNodeObjectData">
            <Size X="0.0000" Y="0.0000" />
            <AnchorPoint />
            <Position X="160.0000" Y="265.0000" />
            <Scale ScaleX="1.0000" ScaleY="1.0000" />
            <CColor A="255" R="255" G="255" B="255" />
            <PrePosition X="0.1250" Y="0.3681" />
            <PreSize X="0.0000" Y="0.0000" />
            <FileData Type="Normal" Path="PokerNode.csd" Plist="" />
          </AbstractNodeData>
          <AbstractNodeData Name="poker_node3" ActionTag="124969377" Tag="552" IconVisible="True" PositionPercentXEnabled="True" PositionPercentYEnabled="True" LeftMargin="680.0640" RightMargin="599.9360" TopMargin="454.9680" BottomMargin="265.0320" StretchWidthEnable="False" StretchHeightEnable="False" InnerActionSpeed="1.0000" CustomSizeEnabled="False" ctype="ProjectNodeObjectData">
            <Size X="0.0000" Y="0.0000" />
            <AnchorPoint />
            <Position X="680.0640" Y="265.0320" />
            <Scale ScaleX="1.0000" ScaleY="1.0000" />
            <CColor A="255" R="255" G="255" B="255" />
            <PrePosition X="0.5313" Y="0.3681" />
            <PreSize X="0.0000" Y="0.0000" />
            <FileData Type="Normal" Path="PokerNode.csd" Plist="" />
          </AbstractNodeData>
        </Children>
      </ObjectData>
    </Content>
  </Content>
</GameFile>